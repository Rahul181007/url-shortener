import { UrlEntity } from '../../domain/entity/url.entity';

export class GetUserUrlsResponseDto {
  id!: string;
  originalUrl!: string;
  shortCode!: string;

  static fromEntity(url: UrlEntity): GetUserUrlsResponseDto {
    return {
      id: url.id!,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
    };
  }
}
