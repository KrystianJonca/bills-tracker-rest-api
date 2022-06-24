import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { SignInDto, SignUpDto } from './dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('User could not be found');

    const passwordMath = await argon.verify(user.passwordHash, dto.password);
    if (!passwordMath) throw new ForbiddenException('Password is incorrect!');

    const tokens = await this.signTokens(user.id, user.username, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUp(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);
    delete dto.password;
    try {
      const user = await this.db.user.create({
        data: {
          ...dto,
          passwordHash: hash,
        },
      });
      const tokens = await this.signTokens(user.id, user.username, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      throw error;
    }
  }

  async logout(userId: number) {
    try {
      await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshTokenHash: null,
        },
      });
      return { message: 'Logged out' };
    } catch (error) {
      throw new ForbiddenException('Could not log out');
    }
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshTokenHash)
      throw new ForbiddenException('Access denied');

    const refreshTokenMatch = await argon.verify(
      user.refreshTokenHash,
      refreshToken,
    );
    if (!refreshTokenMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.signTokens(user.id, user.username, user.email);

    return { access_token: tokens.access_token };
  }

  async signTokens(userId: number, username: string, email: string) {
    const payload = {
      sub: userId,
      username,
      email,
    };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('AT_JWT_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('RT_JWT_SECRET'),
    });

    return { access_token, refresh_token };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const refreshTokenHash = await argon.hash(refreshToken);

    return this.db.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  }
}
