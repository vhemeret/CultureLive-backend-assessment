import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customer.findMany();
  }

  async createCustomer(data: CreateCustomerDTO) {
    if (!data.first_name || !data.last_name) {
      throw new BadRequestException('Missing data to create a new customer.');
    }

    return await this.prisma.customer.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      },
    });
  }

  async updateCustomer(customer_id: number, data: CreateCustomerDTO) {
    if (!data.first_name && !data.last_name && !data.email) {
      throw new BadRequestException('Nothing data to update.');
    }

    const customerExist = await this.prisma.customer.findUnique({
      where: { customer_id },
    });
    if (!customerExist) {
      throw new NotFoundException(
        `The customer id:${customer_id} does not exist.`,
      );
    }

    return await this.prisma.customer.update({
      where: { customer_id },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      },
    });
  }
}
