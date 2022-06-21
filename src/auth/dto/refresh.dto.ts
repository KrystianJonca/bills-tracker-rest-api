import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  refresh_token: User['refreshTokenHash'];
}
