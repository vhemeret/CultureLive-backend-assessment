import { IsString, IsEmail, IsOptional } from '@nestjs/class-validator';

export class CreateCustomerDTO {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
