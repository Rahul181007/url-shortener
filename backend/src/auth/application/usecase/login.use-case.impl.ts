import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../interface/login.use-case';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { PasswordHasher } from '../../../users/domain/service/password-hasher';
import { TokenGenerator } from '../../domain/service/token-generator';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../dto/loginResponse.dto';
import { AppError } from '../../../shared/error/app-error';

@Injectable()
export class LoginUseCaseImpl extends LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {
    super();
  }
  async execute(loginData: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isPassword = await this.passwordHasher.compare(
      loginData.password,
      user.password,
    );
    if (!isPassword) {
      throw new AppError('Invalid credentials', 401);
    }
    const payload = { userId: user.id! };
    const accessToken = await this.tokenGenerator.generateAccessToken(payload);
    const refreshToken =
      await this.tokenGenerator.generateRefreshToken(payload);

    return new LoginResponse(user, accessToken, refreshToken);
  }
}
