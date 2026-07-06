import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../interface/login.use-case';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { PasswordHasher } from '../../../users/domain/service/password-hasher';
import { TokenGenerator } from '../../domain/service/token-generator';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../dto/loginResponse.dto';
import { AuthApplicationMapper } from '../mapper/auth.application.mapper';
import { UnauthorizedError } from '../../../shared/error/unauthorized-error';

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
    const dto = AuthApplicationMapper.toLoginDto(loginData);
    const user = await this._userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const isPassword = await this._passwordHasher.compare(
      dto.password,
      user.password,
    );
    if (!isPassword) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const payload = { userId: user.id! };
    const accessToken = await this._tokenGenerator.generateAccessToken(payload);
    const refreshToken =
      await this._tokenGenerator.generateRefreshToken(payload);

    return new LoginResponse(user, accessToken, refreshToken);
  }
}
