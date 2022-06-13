import { Bill } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  @IsNotEmpty()
  amount: Bill['amount'];

  @IsString()
  @IsNotEmpty()
  description: Bill['description'];
}
