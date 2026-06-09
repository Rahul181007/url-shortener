import { Injectable } from '@nestjs/common';
import { DeleteUrlUseCase } from '../interface/deleteUrl.usecase';
import { UrlRepository } from '../../domain/repositories/url.repository';
import { AppError } from '../../../shared/error/app-error';

@Injectable()
export class DeleteUrlUseCaseImpl extends DeleteUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {
    super();
  }
  async execute(urlId: string, userId: string): Promise<void> {
    const url = await this.urlRepository.findById(urlId);
    if (!url) {
      throw new AppError('url is not found ', 404);
    }
    if (url.userId !== userId) {
      throw new AppError('Forbidden', 403);
    }
    await this.urlRepository.delete(urlId);
  }
}
