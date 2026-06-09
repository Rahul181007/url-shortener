import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppError } from '../../../shared/error/app-error';
import { TokenGenerator } from '../../domain/service/token-generator';
import { AuthenticatedRequest } from '../types/authenticated-request';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenGenerator: TokenGenerator) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorisation = request.headers.authorization;

    if (!authorisation) {
      throw new AppError('unauthorised', 401);
    }

    const [type, token] = authorisation.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new AppError('unauthorised', 401);
    }

    try {
      const payload = await this.tokenGenerator.verifyAccessToken(token);

      request.user = payload;

      return true;
    } catch {
      throw new AppError('unauthorised', 401);
    }
  }
}
