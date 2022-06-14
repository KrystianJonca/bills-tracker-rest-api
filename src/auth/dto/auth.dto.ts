import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: User['email'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: User['passwordHash'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  firstName?: User['firstName'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  lastName?: User['lastName'];
}
