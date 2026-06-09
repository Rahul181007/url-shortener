import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Url, UrlDocument } from '../schema/url.schema';
import { UrlEntity } from '../../domain/entity/url.entity';
import { UrlMapper } from '../mapper/url.mapper';

@Injectable()
export class MongoUrlRepository extends UrlRepository {
  constructor(
    @InjectModel(Url.name)
    private readonly urlModel: Model<UrlDocument>,
  ) {
    super();
  }

  async create(url: UrlEntity): Promise<UrlEntity> {
    const data = UrlMapper.toPersistence(url);
    const newUrl = await this.urlModel.create(data);
    return UrlMapper.toEntity(newUrl);
  }
  async findByShortCode(shortCode: string): Promise<UrlEntity | null> {
    const url = await this.urlModel.findOne({
      shortCode,
    });
    if (!url) return null;
    return UrlMapper.toEntity(url);
  }
  async findByUserId(userId: string): Promise<UrlEntity[]> {
    const urls = await this.urlModel.find({
      userId: new Types.ObjectId(userId),
    });

    return urls.map((url) => UrlMapper.toEntity(url));
  }
  async delete(id: string): Promise<void> {
    await this.urlModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<UrlEntity | null> {
    const url = await this.urlModel.findById(id);
    if (!url) return null;
    return UrlMapper.toEntity(url);
  }
}
