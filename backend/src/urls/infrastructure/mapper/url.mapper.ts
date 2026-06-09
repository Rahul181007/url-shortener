import { Types } from 'mongoose';
import { UrlEntity } from '../../domain/entity/url.entity';
import { UrlDocument } from '../schema/url.schema';

export class UrlMapper {
  static toEntity(url: UrlDocument): UrlEntity {
    return UrlEntity.rehydrate({
      id: url._id.toString(),
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      userId: url.userId.toString(),
    });
  }

  static toPersistence(url: UrlEntity) {
    return {
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      userId: new Types.ObjectId(url.userId),
    };
  }
}
