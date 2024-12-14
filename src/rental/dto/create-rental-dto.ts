import { IsDate, IsInt, IsOptional } from '@nestjs/class-validator';

export class CreateRentalDTO {
  @IsInt()
  @IsOptional()
  film_id: number;

  @IsInt()
  customer_id: number;

  @IsDate()
  return_date: Date;
}
