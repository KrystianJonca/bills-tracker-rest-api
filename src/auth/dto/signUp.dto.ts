import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: User['email'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['passwordHash'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: User['username'];
}
