import { UserEntity } from '../../domain/entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class CreateUserUseCase {
  abstract execute(userData: CreateUserDto): Promise<UserEntity>;
}
