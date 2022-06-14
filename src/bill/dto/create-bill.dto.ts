import { ApiProperty } from '@nestjs/swagger';
import { Bill } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBillDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  amount: Bill['amount'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: Bill['description'];

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  billDate: Bill['billDate'];
}
