import { Bill } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditBillDto {
  @IsNumber()
  @IsOptional()
  amount: Bill['amount'];

  @IsString()
  @IsOptional()
  description: Bill['description'];
}
