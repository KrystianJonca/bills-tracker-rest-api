import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BillService } from './bill.service';

@UseGuards(JwtGuard)
@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}
}
