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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities';

@UseGuards(JwtGuard)
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity })
  getUser(@GetUser() user: User) {
    return user;
  }

  @Patch()
  @ApiOkResponse({ type: UserEntity })
  editUser(@GetUser('id') userId: User['id'], @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete()
  @ApiOkResponse({ type: UserEntity })
  deleteUser(@GetUser('id') userId: User['id']) {
    return this.userService.deleteUserById(userId);
  }
}
