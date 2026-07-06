import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../interface/create-user.use-case';
import { UserEntity } from '../../domain/entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordHasher } from '../../domain/service/password-hasher';
import { UserApplicationMapper } from '../mappers/user.application.mapper';
import { ConflictError } from '../../../shared/error/conflict-error';

@Injectable()
export class CreateUserUseCaseImpl extends CreateUserUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordHasher: PasswordHasher,
  ) {
    super();
  }
  async execute(userData: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this._userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError('user already exist');
    }
    const user = UserApplicationMapper.toEntity(userData);
    user.password = await this._passwordHasher.hash(user.password);

    const savedUser = await this._userRepository.create(user);
    return savedUser;
  }
}
