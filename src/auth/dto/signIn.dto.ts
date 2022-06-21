import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: User['email'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['passwordHash'];
}
