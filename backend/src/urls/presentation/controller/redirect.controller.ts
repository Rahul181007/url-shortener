import { Controller, Get, Param, Res } from '@nestjs/common';
import { GetOriginalUrlUseCase } from '../../application/interface/get-original-url.use-case';
import type { Response } from 'express';

@Controller()
export class RedirectController {
  constructor(private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase) {}
  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() response: Response,
  ) {
    const originalUrl = await this.getOriginalUrlUseCase.execute(shortCode);
    return response.redirect(originalUrl);
  }
}
