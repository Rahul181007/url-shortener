import { UrlEntity } from '../../domain/entity/url.entity';

export class CreateShortUrlResponseDto {
  id!: string;
  originalUrl!: string;
  shortCode!: string;
  static fromEntity(url: UrlEntity): CreateShortUrlResponseDto {
    return {
      id: url.id!,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
    };
  }
}
