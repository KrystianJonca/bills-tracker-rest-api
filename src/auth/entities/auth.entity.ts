import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty({ type: String })
  access_token: string;
}
