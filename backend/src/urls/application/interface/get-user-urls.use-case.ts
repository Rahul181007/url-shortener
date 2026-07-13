import { UrlEntity } from '../../domain/entity/url.entity';

export abstract class GetUserUrlUseCase {
  abstract execute(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{
    urls: UrlEntity[];
    total: number;
  }>;
}
