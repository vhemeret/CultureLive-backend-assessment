import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment-timezone';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  listAllTasks() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((job, key) => {
      try {
        const nextExecution = job.nextDate();
        this.logger.log(
          `Planified task(s) : ${nextExecution ? nextExecution.toJSDate() : 'Nothing planified.'}`,
        );
      } catch (error) {
        this.logger.error(
          `Error when trying to get planified tasks ${key} : ${error.message}`,
        );
      }
    });
  }

  runTask() {
    const taskName = 'reminder';
    const job: CronJob = this.schedulerRegistry.getCronJob(taskName);
    if (job) {
      job.fireOnTick();
      this.logger.log(`Manually triggered task: ${taskName}`);
      return `Task ${taskName} has been triggered manually.`;
    }
    return `Task ${taskName} not found.`;
  }

  //   to test every minute
  //   @Cron('* * * * *')
  @Cron('0 12 * * *', { name: 'reminder' })
  async handleCron() {
    const rentals = await this.prisma.rental.findMany({
      include: { customer: true },
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
