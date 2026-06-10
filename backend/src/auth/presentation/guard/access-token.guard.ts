import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppError } from '../../../shared/error/app-error';
import { TokenGenerator } from '../../domain/service/token-generator';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenGenerator: TokenGenerator) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = request.cookies?.accessToken as string | undefined;

    if (!token) {
      throw new AppError('unauthorised', 401);
    }
    try {
      const payload = await this.tokenGenerator.verifyAccessToken(token);

      request.user = payload;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError('ACCESS_TOKEN_EXPIRED', 401);
      }
      throw new AppError('unauthorised', 401);
    }
  }
}
