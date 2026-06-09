import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schema/user.schema';
import { UserRepository } from './domain/repositories/user.repository';
import { MongoUserRepository } from './infrastructure/repositories/mongo-user.repository';
import { PasswordHasher } from './domain/service/password-hasher';
import { BcryptPasswordHasher } from './infrastructure/service/bcrypt-password-hasher';
import { CreateUserUseCase } from './application/interface/create-user.use-case';
import { CreateUserUseCaseImpl } from './application/usecase/create-user.use-case.impl';

@Module({
  // 1. Register the User model with Mongoose like we do in nodejs mongoose.model('User', UserSchema)
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],

  providers: [
    {
      provide: UserRepository,
      useClass: MongoUserRepository,
    },
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: CreateUserUseCase,
      useClass: CreateUserUseCaseImpl,
    },
  ],
  exports: [UserRepository, PasswordHasher, CreateUserUseCase],
})
export class UsersModule {}
