import { Injectable } from '@nestjs/common';
import { CreateShortUrlUseCase } from '../interface/create-short-url.use-case';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { ShortCodeGenerator } from '../../domain/service/short-code-generator';
import { UrlEntity } from '../../domain/entity/url.entity';
import { CreateShortUrlDto } from '../dto/create-short-url.dto';

@Injectable()
export class CreateShortUrlUseCaseImpl extends CreateShortUrlUseCase {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly shortCodeGenerator: ShortCodeGenerator,
  ) {
    super();
  }
  async execute(data: CreateShortUrlDto): Promise<UrlEntity> {
    let shortCode = '';
    do {
      shortCode = this.shortCodeGenerator.generate();
    } while (await this.urlRepository.findByShortCode(shortCode));

    const url = UrlEntity.create({
      originalUrl: data.originalUrl,
      shortCode,
      userId: data.userId,
    });

    return this.urlRepository.create(url);
  }
}
