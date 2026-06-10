import { UserEntity } from '../../../users/domain/entity/user.entity';

export abstract class GetCurrentUserUseCase {
  abstract execute(userId: string): Promise<UserEntity>;
}
