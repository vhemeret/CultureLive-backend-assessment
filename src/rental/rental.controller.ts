import { Body, Controller, Get, Post } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDTO } from './dto/create-rental-dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  async findAll() {
    return this.rentalService.findAll();
  }

  @Post()
  async createRental(@Body() createRentalDTO: CreateRentalDTO) {
    return this.rentalService.createRental(createRentalDTO);
  }
}
