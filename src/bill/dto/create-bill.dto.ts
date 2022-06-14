import { Bill } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  @IsNotEmpty()
  amount: Bill['amount'];

  @IsString()
  @IsNotEmpty()
  description: Bill['description'];

  @IsDateString()
  @IsNotEmpty()
  billDate: Bill['billDate'];
}
