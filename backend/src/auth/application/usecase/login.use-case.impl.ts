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
    private readonly _userRepository: UserRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _tokenGenerator: TokenGenerator,
  ) {
    super();
  }
  async execute(loginData: LoginDto): Promise<LoginResponse> {
    const user = await this._userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }
    const isPassword = await this._passwordHasher.compare(
      loginData.password,
      user.password,
    );
    if (!isPassword) {
      throw new AppError('Invalid email or password', 401);
    }
    const payload = { userId: user.id! };
    const accessToken = await this._tokenGenerator.generateAccessToken(payload);
    const refreshToken =
      await this._tokenGenerator.generateRefreshToken(payload);

    return new LoginResponse(user, accessToken, refreshToken);
  }
}
