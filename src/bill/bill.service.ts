import { ForbiddenException, Injectable } from '@nestjs/common';
import { Bill, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateBillDto, EditBillDto } from './dto';

@Injectable()
export class BillService {
  constructor(private readonly db: DatabaseService) {}

  async getAllBills(userId: User['id']) {
    const bills = await this.db.bill.findMany({ where: { userId } });
    return bills;
  }

  async getBill(userId: User['id'], billId: Bill['id']) {
    const bill = await this.db.bill.findFirst({
      where: {
        id: billId,
        userId,
      },
    });
    return bill;
  }

  async createBill(userId: User['id'], dto: CreateBillDto) {
    const newBill = await this.db.bill.create({ data: { userId, ...dto } });
    return newBill;
  }

  async editBill(userId: User['id'], billId: Bill['id'], dto: EditBillDto) {
    const bill = await this.db.bill.findUnique({ where: { id: billId } });

    if (!bill || bill.userId !== userId)
      throw new ForbiddenException('Resourse is not accessible.');

    const editedBill = await this.db.bill.update({
      where: { id: billId },
      data: { ...dto },
    });
    return editedBill;
  }

  async deleteBill(userId: User['id'], billId: Bill['id']) {
    const bill = await this.db.bill.findUnique({ where: { id: billId } });

    if (!bill || bill.userId !== userId)
      throw new ForbiddenException('Resourse is not accessible.');

    const deletedBill = await this.db.bill.delete({ where: { id: billId } });
    return deletedBill;
  }
}
