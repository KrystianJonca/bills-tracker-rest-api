import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async editUser(userId: User['id'], dto: EditUserDto) {
    const user = await this.db.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete user.refreshTokenHash;
    delete user.passwordHash;
    return user;
  }

  async deleteUserById(userId: User['id']) {
    const user = await this.db.user.delete({ where: { id: userId } });
    delete user.refreshTokenHash;
    delete user.passwordHash;
    return user;
  }
}
