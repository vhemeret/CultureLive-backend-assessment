import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment-timezone';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TasksService.name);

  //   to test every minute
  //     @Cron('* * * * *')
  @Cron('0 12 * * *')
  async handleCron() {
    const rentals = await this.prisma.rental.findMany({
      include: {
        customer: true,
      },
    });

    rentals.forEach((rental) => {
      const now = moment().tz(rental.customer.timezone);
      const returnDate = moment(rental.return_date).tz(
        rental.customer.timezone,
      );

      const daysDiff = returnDate.diff(now, 'days');

      if (daysDiff === 5 || daysDiff === 3) {
        this.logger.log(
          `Rental:${rental.rental_id} email:${rental.customer.email}: Hi ${rental.customer.first_name}, your rental will expire in ${daysDiff} days. Local time: ${now.format()}`,
        );
      }
    });
  }
}
