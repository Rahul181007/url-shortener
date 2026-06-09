import { RefreshTokenResultDto } from '../dto/refresh-token-response.dto';

export abstract class RefreshTokenUseCase {
  abstract execute(refreshToken: string): Promise<RefreshTokenResultDto>;
}
