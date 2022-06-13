import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Bill, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BillService } from './bill.service';
import { CreateBillDto, EditBillDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  getAllBills(@GetUser('id') userId: User['id']) {
    return this.billService.getAllBills(userId);
  }

  @Get(':id')
  getBill(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) billId: Bill['id'],
  ) {
    return this.billService.getBill(userId, billId);
  }

  @Post()
  createBill(@GetUser('id') userId: User['id'], @Body() dto: CreateBillDto) {
    return this.billService.createBill(userId, dto);
  }

  @Patch(':id')
  editBill(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) billId: Bill['id'],
    @Body() dto: EditBillDto,
  ) {
    return this.billService.editBill(userId, billId, dto);
  }

  @Delete(':id')
  deleteBill(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) billId: Bill['id'],
  ) {
    return this.billService.deleteBill(userId, billId);
  }
}
