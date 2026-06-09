import { UserEntity } from '../../../users/domain/entity/user.entity';

export class LoginResponse {
  constructor(
    public readonly user: UserEntity,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
