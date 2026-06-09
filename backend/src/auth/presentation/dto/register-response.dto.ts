import { UserEntity } from '../../../users/domain/entity/user.entity';

export class RegisterResponseDto {
  id!: string;
  name!: string;
  email!: string;

  static fromEntity(user: UserEntity): RegisterResponseDto {
    return {
      id: user.id!,
      name: user.name,
      email: user.email,
    };
  }
}
