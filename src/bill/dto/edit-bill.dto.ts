import { ApiProperty } from '@nestjs/swagger';
import { Bill } from '@prisma/client';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditBillDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  amount?: Bill['amount'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description?: Bill['description'];

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  billDate?: Bill['billDate'];
}
