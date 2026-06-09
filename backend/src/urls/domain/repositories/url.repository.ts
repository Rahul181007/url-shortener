import { UrlEntity } from '../entity/url.entity';

export abstract class UrlRepository {
  abstract create(url: UrlEntity): Promise<UrlEntity>;
  abstract findById(id: string): Promise<UrlEntity | null>;
  abstract findByShortCode(shortCode: string): Promise<UrlEntity | null>;
  abstract findByUserId(userId: string): Promise<UrlEntity[]>;
  abstract delete(id: string): Promise<void>;
}
