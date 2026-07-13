import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateShortUrlUseCase } from '../../application/interface/create-short-url.use-case';
import { AccessTokenGuard } from '../../../auth/presentation/guard/access-token.guard';
import { CreateShortUrlDto } from '../../application/dto/create-short-url.dto';
import type { AuthenticatedRequest } from '../../../auth/presentation/types/authenticated-request';
import { CreateShortUrlResponseDto } from '../dto/create-short-url-response.dto';
import { CreateShortUrlRequestDto } from '../dto/create-short-url-request.dto';
import { GetUserUrlUseCase } from '../../application/interface/get-user-urls.use-case';
import { GetUserUrlsResponseDto } from '../dto/get-user-urls-response.dto';
import { DeleteUrlUseCase } from '../../application/interface/deleteUrl.usecase';
import { ROUTES } from '../../../shared/constants/routes';
import { GetUserUrlsPaginatedResponseDto } from '../dto/get-user-urls-paginated-response.dto';

@Controller(ROUTES.URLS.BASE)
export class UrlsController {
  constructor(
    private readonly _createShortCodeUrlUseCase: CreateShortUrlUseCase,
    private readonly _getUserUrlsUseCase: GetUserUrlUseCase,
    private readonly _deleteUrlUseCase: DeleteUrlUseCase,
  ) {}

  @Post(ROUTES.URLS.CREATE)
  @UseGuards(AccessTokenGuard)
  async createUrl(
    @Body() request: CreateShortUrlRequestDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreateShortUrlResponseDto> {
    const dto = new CreateShortUrlDto();
    dto.originalUrl = request.originalUrl;
    dto.userId = req.user.userId;
    const url = await this._createShortCodeUrlUseCase.execute(dto);
    return CreateShortUrlResponseDto.fromEntity(url);
  }

  @Get(ROUTES.URLS.GET_ALL)
  @UseGuards(AccessTokenGuard)
  async getUserUrls(
    @Req() request: AuthenticatedRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<GetUserUrlsPaginatedResponseDto> {
    const result = await this._getUserUrlsUseCase.execute(
      request.user.userId,
      Number(page),
      Number(limit),
    );
    return {
      urls: result.urls.map((url) => GetUserUrlsResponseDto.fromEntity(url)),
      page: Number(page),
      limit: Number(limit),
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    };
  }

  @Delete(ROUTES.URLS.DELETE)
  @UseGuards(AccessTokenGuard)
  async deleteUrl(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    await this._deleteUrlUseCase.execute(id, request.user.userId);
  }
}
