import { Injectable } from '@nestjs/common';
import { GetOriginalUrlUseCase } from '../interface/get-original-url.use-case';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { AppError } from '../../../shared/error/app-error';

@Injectable()
export class GetOriginalUrlUseCaseImpl extends GetOriginalUrlUseCase {
  constructor(private readonly _urlRepository: UrlRepository) {
    super();
  }
  async execute(shortCode: string): Promise<string> {
    const url = await this._urlRepository.findByShortCode(shortCode);
    if (!url) {
      throw new AppError('Url not found', 404);
    }
    return url.originalUrl;
  }
}
