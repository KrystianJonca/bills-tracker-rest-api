import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('User cold not be found');

    const passwordMath = await argon.verify(user.passwordHash, dto.password);
    if (!passwordMath) throw new ForbiddenException('Password is incorrect!');

    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    delete dto.password;
    try {
      const user = await this.db.user.create({
        data: {
          ...dto,
          passwordHash: hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return { access_token: token };
  }
}
