import { Injectable } from '@nestjs/common';
import { GetUserUrlUseCase } from '../interface/get-user-urls.use-case';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { UrlEntity } from '../../domain/entity/url.entity';

@Injectable()
export class GetUserUrlsUseCaseImpl extends GetUserUrlUseCase {
  constructor(private readonly _urlRepository: UrlRepository) {
    super();
  }
  async execute(userId: string): Promise<UrlEntity[]> {
    const urls = await this._urlRepository.findByUserId(userId);
    return urls;
  }
}
