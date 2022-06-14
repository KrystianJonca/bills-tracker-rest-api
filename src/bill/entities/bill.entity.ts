import { ApiProperty } from '@nestjs/swagger';
import { Bill } from '@prisma/client';

export class BillEntity implements Bill {
  @ApiProperty({ type: Number })
  id: Bill['id'];
  @ApiProperty({ type: String })
  createdAt: Bill['createdAt'];
  @ApiProperty({ type: String })
  updatedAt: Bill['updatedAt'];

  @ApiProperty({ type: Number })
  amount: Bill['amount'];
  @ApiProperty({ type: String })
  description: Bill['description'];
  @ApiProperty({ type: String })
  billDate: Bill['billDate'];
  @ApiProperty({ type: Number })
  userId: Bill['userId'];
}
