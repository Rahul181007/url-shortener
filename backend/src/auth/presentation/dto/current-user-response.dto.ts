import { UserEntity } from '../../../users/domain/entity/user.entity';

export class CurrentUserResponseDto {
  id!: string;
  name!: string;
  email!: string;

  static fromEntity(user: UserEntity): CurrentUserResponseDto {
    return {
      id: user.id!,
      name: user.name,
      email: user.email,
    };
  }
}
