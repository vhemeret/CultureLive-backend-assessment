import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Post()
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return this.customerService.createCustomer(createCustomerDTO);
  }

  @Patch(':id')
  async updateCustomer(
    @Param('id') id,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const customer_id = parseInt(id, 10);
    return this.customerService.updateCustomer(customer_id, createCustomerDTO);
  }
}
