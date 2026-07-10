import { Injectable } from '@nestjs/common';
import { CreateShortUrlUseCase } from '../interface/create-short-url.use-case';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { ShortCodeGenerator } from '../../domain/service/short-code-generator';
import { UrlEntity } from '../../domain/entity/url.entity';
import { CreateShortUrlDto } from '../dto/create-short-url.dto';

@Injectable()
export class CreateShortUrlUseCaseImpl extends CreateShortUrlUseCase {
  constructor(
    private readonly _urlRepository: UrlRepository,
    private readonly _shortCodeGenerator: ShortCodeGenerator,
  ) {
    super();
  }
  async execute(data: CreateShortUrlDto): Promise<UrlEntity> {
    const existingUrl = await this._urlRepository.findByOriginalUrlAndUser(
      data.originalUrl,
      data.userId,
    );
    if (existingUrl) return existingUrl;
    let shortCode = '';
    do {
      shortCode = this._shortCodeGenerator.generate();
    } while (await this._urlRepository.findByShortCode(shortCode));

    const url = UrlEntity.create({
      originalUrl: data.originalUrl,
      shortCode,
      userId: data.userId,
    });

    return this._urlRepository.create(url);
  }
}
