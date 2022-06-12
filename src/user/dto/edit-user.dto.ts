import { User } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: User['email'];

  @IsString()
  @IsOptional()
  firstName?: User['firstName'];

  @IsString()
  @IsOptional()
  lastName?: User['lastName'];
}
