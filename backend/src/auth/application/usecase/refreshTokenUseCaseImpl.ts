import { Injectable } from '@nestjs/common';
import { RefreshTokenUseCase } from '../interface/refresh-token.use-case';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { TokenGenerator } from '../../domain/service/token-generator';
import { RefreshTokenResultDto } from '../dto/refresh-token-response.dto';
import { AppError } from '../../../shared/error/app-error';

@Injectable()
export class RefreshTokenUseCaseImpl extends RefreshTokenUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _tokenGenerator: TokenGenerator,
  ) {
    super();
  }

  async execute(refreshToken: string): Promise<RefreshTokenResultDto> {
    const payload = await this._tokenGenerator.verifyRefreshToken(refreshToken);
    const user = await this._userRepository.findById(payload.userId);
    if (!user) {
      throw new AppError('user not found', 404);
    }
    const accessToken = await this._tokenGenerator.generateAccessToken({
      userId: user.id!,
    });
    return new RefreshTokenResultDto(accessToken);
  }
}
