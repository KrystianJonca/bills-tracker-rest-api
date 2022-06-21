import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements Partial<User> {
  @ApiProperty({ type: Number })
  id: User['id'];
  @ApiProperty({ type: String })
  createdAt: User['createdAt'];
  @ApiProperty({ type: String })
  updatedAt: User['updatedAt'];

  @ApiProperty({ type: String })
  email: User['email'];
  @ApiProperty({ type: String })
  username: User['username'];
}
