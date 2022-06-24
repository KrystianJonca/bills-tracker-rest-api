import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { SignInDto, SignUpDto, RefreshDto } from './dto';
import { AuthEntity } from './entities';
import { RtJwtGuard } from './guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOkResponse({ type: AuthEntity })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @UseGuards(RtJwtGuard)
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('id') userId: User['id']) {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @UseGuards(RtJwtGuard)
  @HttpCode(HttpStatus.OK)
  refresh(@GetUser('id') userId: User['id'], @Body() dto: RefreshDto) {
    return this.authService.refreshToken(userId, dto.refresh_token);
  }

  @Post('signup')
  @ApiCreatedResponse({ type: AuthEntity })
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
