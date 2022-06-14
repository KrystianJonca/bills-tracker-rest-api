import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  email?: User['email'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  firstName?: User['firstName'];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  lastName?: User['lastName'];
}
