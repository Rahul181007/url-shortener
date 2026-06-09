import { Injectable } from '@nestjs/common';
import { GetUserUrlUseCase } from '../interface/get-user-urls.use-case';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { UrlEntity } from '../../domain/entity/url.entity';

@Injectable()
export class GetUserUrlsUseCaseImpl extends GetUserUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {
    super();
  }
  async execute(userId: string): Promise<UrlEntity[]> {
    const urls = await this.urlRepository.findByUserId(userId);
    return urls;
  }
}
