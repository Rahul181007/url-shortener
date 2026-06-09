import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../interface/create-user.use-case';
import { UserEntity } from '../../domain/entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordHasher } from '../../domain/service/password-hasher';
import { AppError } from '../../../shared/error/app-error';

@Injectable()
export class CreateUserUseCaseImpl extends CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {
    super();
  }
  async execute(userData: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('user already exist', 409);
    }
    const hashedPassword = await this.passwordHasher.hash(userData.password);
    const user = UserEntity.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.create(user);
    return savedUser;
  }
}
