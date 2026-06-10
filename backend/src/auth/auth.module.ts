import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenGenerator } from './domain/service/token-generator';
import { JwtTokenGenerator } from './infrastructure/service/jwt-token-generator';
import { LoginUseCase } from './application/interface/login.use-case';
import { LoginUseCaseImpl } from './application/usecase/login.use-case.impl';
import { RefreshTokenUseCase } from './application/interface/refresh-token.use-case';
import { RefreshTokenUseCaseImpl } from './application/usecase/refreshTokenUseCaseImpl';
import { AccessTokenGuard } from './presentation/guard/access-token.guard';
import { GetCurrentUserUseCase } from './application/interface/get-current-user.use-case';
import { GetCurrentUserUseCaseImpl } from './application/usecase/get-current-user.use-case.impl';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: TokenGenerator,
      useClass: JwtTokenGenerator,
    },
    {
      provide: LoginUseCase,
      useClass: LoginUseCaseImpl,
    },
    {
      provide: RefreshTokenUseCase,
      useClass: RefreshTokenUseCaseImpl,
    },
    {
      provide: GetCurrentUserUseCase,
      useClass: GetCurrentUserUseCaseImpl,
    },
    AccessTokenGuard,
  ],

  exports: [TokenGenerator, LoginUseCase, RefreshTokenUseCase],
})
export class AuthModule {}
