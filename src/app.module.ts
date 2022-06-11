import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BillModule } from './bill/bill.module';

@Module({
  imports: [AuthModule, UserModule, BillModule],
})
export class AppModule {}
