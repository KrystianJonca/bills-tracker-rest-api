import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Bill, User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BillService } from './bill.service';
import { CreateBillDto, EditBillDto } from './dto';
import { BillEntity } from './entities';

@UseGuards(JwtGuard)
@Controller('bills')
@ApiTags('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  @ApiOkResponse({ type: [BillEntity] })
  getAllBills(@GetUser('id') userId: User['id']) {
    return this.billService.getAllBills(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: BillEntity })
  @ApiParam({ name: 'id', description: 'Bill id' })
  getBill(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) billId: Bill['id'],
  ) {
    return this.billService.getBill(userId, billId);
  }

  @Post()
  @ApiCreatedResponse({ type: BillEntity })
  createBill(@GetUser('id') userId: User['id'], @Body() dto: CreateBillDto) {
    return this.billService.createBill(userId, dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BillEntity })
  @ApiParam({ name: 'id', description: 'Bill id' })
  editBill(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) billId: Bill['id'],
    @Body() dto: EditBillDto,
  ) {
    return this.billService.editBill(userId, billId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({ type: BillEntity })
  @ApiParam({ name: 'id', description: 'Bill id' })
  deleteBill(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) billId: Bill['id'],
  ) {
    return this.billService.deleteBill(userId, billId);
  }
}
