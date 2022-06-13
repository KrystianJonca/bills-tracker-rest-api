import {
  Controller,
  Get,
  Delete,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: User['id'], @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete()
  deleteUser(@GetUser('id') userId: User['id']) {
    return this.userService.deleteUserById(userId);
  }
}
