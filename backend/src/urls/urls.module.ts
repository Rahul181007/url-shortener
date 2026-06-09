import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './infrastructure/schema/url.schema';
import { UrlRepository } from './domain/repositories/url.repository';
import { MongoUrlRepository } from './infrastructure/repositories/mongo-url.repository';
import { ShortCodeGenerator } from './domain/service/short-code-generator';
import { RandomShortCodeGenerator } from './infrastructure/service/random-short-code-generator';
import { CreateShortUrlUseCase } from './application/interface/create-short-url.use-case';
import { CreateShortUrlUseCaseImpl } from './application/usecase/create-short-url.use-case.impl';
import { UrlsController } from './presentation/controller/urls.controller';
import { AuthModule } from '../auth/auth.module';
import { GetOriginalUrlUseCase } from './application/interface/get-original-url.use-case';
import { GetOriginalUrlUseCaseImpl } from './application/usecase/get-original-url.use-case.impl';
import { RedirectController } from './presentation/controller/redirect.controller';
import { GetUserUrlUseCase } from './application/interface/get-user-urls.use-case';
import { GetUserUrlsUseCaseImpl } from './application/usecase/getuserUrl.usecase.impl';
import { DeleteUrlUseCase } from './application/interface/deleteUrl.usecase';
import { DeleteUrlUseCaseImpl } from './application/usecase/deleteUrl.usecase.impl';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UrlRepository,
      useClass: MongoUrlRepository,
    },
    {
      provide: ShortCodeGenerator,
      useClass: RandomShortCodeGenerator,
    },
    {
      provide: CreateShortUrlUseCase,
      useClass: CreateShortUrlUseCaseImpl,
    },

    {
      provide: GetOriginalUrlUseCase,
      useClass: GetOriginalUrlUseCaseImpl,
    },

    {
      provide: GetUserUrlUseCase,
      useClass: GetUserUrlsUseCaseImpl,
    },
    {
      provide: DeleteUrlUseCase,
      useClass: DeleteUrlUseCaseImpl,
    },
  ],
  exports: [CreateShortUrlUseCase, GetOriginalUrlUseCase],
  controllers: [UrlsController, RedirectController],
})
export class UrlsModule {}
