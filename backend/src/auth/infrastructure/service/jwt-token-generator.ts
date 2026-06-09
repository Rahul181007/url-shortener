import { Injectable } from '@nestjs/common';
import {
  JwtPayload,
  TokenGenerator,
} from '../../domain/service/token-generator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Injectable()
export class JwtTokenGenerator extends TokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }
  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
    if (!expiresIn) {
      throw new Error('JWT_ACCESS_EXPIRES_IN is missing');
    }
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');

    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is missing');
    }
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn as StringValue,
    });
  }
  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');
    if (!expiresIn) {
      throw new Error('JWT_REFRESH_EXPIRES_IN is missing');
    }
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is missing');
    }
    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn as StringValue,
    });
  }
  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is missing');
    }
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: secret,
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is missing');
    }
    return this.jwtService.verifyAsync<JwtPayload>(token, { secret });
  }
}
