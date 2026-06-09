import { UrlEntity } from '../../domain/entity/url.entity';

export abstract class GetUserUrlUseCase {
  abstract execute(userId: string): Promise<UrlEntity[]>;
}
