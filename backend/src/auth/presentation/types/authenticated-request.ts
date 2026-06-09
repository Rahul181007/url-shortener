import { Request } from 'express';
import { JwtPayload } from '../../domain/service/token-generator';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
