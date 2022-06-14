import { Bill } from '@prisma/client';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditBillDto {
  @IsNumber()
  @IsOptional()
  amount?: Bill['amount'];

  @IsString()
  @IsOptional()
  description?: Bill['description'];

  @IsDateString()
  @IsOptional()
  billDate?: Bill['billDate'];
}
