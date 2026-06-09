import { UrlEntity } from '../../domain/entity/url.entity';
import { CreateShortUrlDto } from '../dto/create-short-url.dto';

export abstract class CreateShortUrlUseCase {
  abstract execute(data: CreateShortUrlDto): Promise<UrlEntity>;
}
