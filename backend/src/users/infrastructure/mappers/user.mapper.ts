import { UserEntity } from '../../domain/entity/user.entity';
import { UserDocument } from '../schema/user.schema';

export class UserMapper {
  static toEntity(user: UserDocument): UserEntity {
    return UserEntity.rehydrate({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
  static toPersistence(user: UserEntity) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
