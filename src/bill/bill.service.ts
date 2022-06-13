import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BillService {
  constructor(private readonly db: DatabaseService) {}
}
