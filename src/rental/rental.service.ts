import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRentalDTO } from './dto/create-rental-dto';
import { addWeeks } from 'date-fns';

@Injectable()
export class RentalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.rental.findMany();
  }

  async createRental(data: CreateRentalDTO) {
    if (!data.customer_id || !data.film_id || !data.return_date) {
      throw new BadRequestException('Missing data.');
    }

    const existCustomer = await this.prisma.customer.findUnique({
      where: { customer_id: data.customer_id },
    });
    if (!existCustomer) {
      throw new NotFoundException(
        `The customer id:${data.customer_id} does not exist.`,
      );
    }

    const existFilm = await this.prisma.film.findUnique({
      where: { film_id: data.film_id },
    });
    if (!existFilm) {
      throw new NotFoundException(
        `The film id:${data.film_id} does not exist.`,
      );
    }

    const rentalDate = new Date();
    const returnDate = new Date(data.return_date);
    if (
      returnDate < addWeeks(rentalDate, 1) ||
      returnDate > addWeeks(rentalDate, 3)
    ) {
      throw new BadRequestException(
        'La date de retour doit être au minimum 1 semaine et au maximum 3 semaines après la date de location.',
      );
    }

    return await this.prisma.rental.create({
      data: {
        customer: { connect: { customer_id: data.customer_id } },
        film: { connect: { film_id: data.film_id } },
        rental_date: rentalDate,
        return_date: data.return_date,
      },
    });
  }
  Catch(error) {
    throw new BadRequestException(
      'Erreur lors de la création de la location.',
      error,
    );
  }
}
