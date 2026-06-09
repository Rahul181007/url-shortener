import { RefreshTokenResultDto } from '../../application/dto/refresh-token-response.dto';

export class RefreshTokenResponseDto {
  accessToken!: string;
  static fromApplication(
    response: RefreshTokenResultDto,
  ): RefreshTokenResponseDto {
    return {
      accessToken: response.accessToken,
    };
  }
}
