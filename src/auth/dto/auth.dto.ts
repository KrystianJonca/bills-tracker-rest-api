import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: User['email'];

  @IsString()
  @IsNotEmpty()
  password: User['passwordHash'];

  @IsString()
  @IsOptional()
  firstName?: User['firstName'];

  @IsString()
  @IsOptional()
  lastName?: User['lastName'];
}
