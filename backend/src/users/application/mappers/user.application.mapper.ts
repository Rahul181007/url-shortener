import { UserEntity } from '../../domain/entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserApplicationMapper {
  static toEntity(dto: CreateUserDto): UserEntity {
    return UserEntity.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }
}
