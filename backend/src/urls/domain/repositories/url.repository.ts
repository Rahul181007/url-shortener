import { UrlEntity } from '../entity/url.entity';

export abstract class UrlRepository {
  abstract create(url: UrlEntity): Promise<UrlEntity>;
  abstract findById(id: string): Promise<UrlEntity | null>;
  abstract findByShortCode(shortCode: string): Promise<UrlEntity | null>;
  abstract findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{
    urls: UrlEntity[];
    total: number;
  }>;
  abstract delete(id: string): Promise<void>;
  abstract findByOriginalUrlAndUser(
    originalUrl: string,
    userId: string,
  ): Promise<UrlEntity | null>;
}
