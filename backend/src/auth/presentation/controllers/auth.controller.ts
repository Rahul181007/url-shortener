import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../users/application/interface/create-user.use-case';
import { CreateUserDto } from '../../../users/application/dto/create-user.dto';
import { RegisterRequestDto } from '../dto/register-request.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { LoginUseCase } from '../../application/interface/login.use-case';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../../application/dto/login.dto';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenUseCase } from '../../application/interface/refresh-token.use-case';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import { AppError } from '../../../shared/error/app-error';
import { AccessTokenGuard } from '../guard/access-token.guard';
import type { AuthenticatedRequest } from '../types/authenticated-request';

@Controller('auth') //auth is prefix of route
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly configService: ConfigService,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('register') //route will be /auth/register
  async register(
    @Body() request: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const createUserDto = new CreateUserDto();
    createUserDto.name = request.name;
    createUserDto.email = request.email;
    createUserDto.password = request.password;
    const user = await this.createUserUseCase.execute(createUserDto);
    return RegisterResponseDto.fromEntity(user);
  }

  @Post('login')
  async login(
    @Body() request: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const loginDto = new LoginDto();

    loginDto.email = request.email;
    loginDto.password = request.password;

    const result = await this.loginUseCase.execute(loginDto);

    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return LoginResponseDto.fromApplication(result);
  }

  @Post('refresh')
  async refresh(@Req() request: Request): Promise<RefreshTokenResponseDto> {
    const refreshToken = request.cookies?.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new AppError('Refresh token is missing', 401);
    }
    const result = await this.refreshTokenUseCase.execute(refreshToken);
    return RefreshTokenResponseDto.fromApplication(result);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): { message: string } {
    response.clearCookie('refreshToken');
    return {
      message: 'Logged out successfully',
    };
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  getMe(@Req() request: AuthenticatedRequest) {
    return {
      userId: request.user.userId,
    };
  }
}
