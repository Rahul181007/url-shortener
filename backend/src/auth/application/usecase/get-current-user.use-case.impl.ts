import { Injectable } from '@nestjs/common';
import { GetCurrentUserUseCase } from '../interface/get-current-user.use-case';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { UserEntity } from '../../../users/domain/entity/user.entity';
import { AppError } from '../../../shared/error/app-error';

@Injectable()
export class GetCurrentUserUseCaseImpl extends GetCurrentUserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }
  async execute(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('user not found', 404);
    }
    return user;
  }
}
