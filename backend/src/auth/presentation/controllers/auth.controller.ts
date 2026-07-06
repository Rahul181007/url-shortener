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
import { AppError } from '../../../shared/error/app-error';
import { AccessTokenGuard } from '../guard/access-token.guard';
import type { AuthenticatedRequest } from '../types/authenticated-request';
import { GetCurrentUserUseCase } from '../../application/interface/get-current-user.use-case';
import { CurrentUserResponseDto } from '../dto/current-user-response.dto';
import { ROUTES } from '../../../shared/constants/routes';

@Controller(ROUTES.AUTH.BASE) //auth is prefix of route
export class AuthController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _loginUseCase: LoginUseCase,
    private readonly _configService: ConfigService,
    private readonly _refreshTokenUseCase: RefreshTokenUseCase,
    private readonly _getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post(ROUTES.AUTH.REGISTER) //route will be /auth/register
  async register(
    @Body() request: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const createUserDto = new CreateUserDto();
    createUserDto.name = request.name;
    createUserDto.email = request.email;
    createUserDto.password = request.password;
    const user = await this._createUserUseCase.execute(createUserDto);
    return RegisterResponseDto.fromEntity(user);
  }

  @Post(ROUTES.AUTH.LOGIN)
  async login(
    @Body() request: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const loginDto = new LoginDto();

    loginDto.email = request.email;
    loginDto.password = request.password;

    const result = await this._loginUseCase.execute(loginDto);
    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: this._configService.get('NODE_ENV') === 'production',
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: this._configService.get('NODE_ENV') === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return LoginResponseDto.fromApplication(result);
  }

  @Post(ROUTES.AUTH.REFRESH)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const refreshToken = request.cookies?.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new AppError('Refresh token is missing', 401);
    }
    const result = await this._refreshTokenUseCase.execute(refreshToken);
    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: this._configService.get('NODE_ENV') === 'production',
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });
    return {
      message: 'Token refreshed  successfully',
    };
  }

  @Post(ROUTES.AUTH.LOGOUT)
  logout(@Res({ passthrough: true }) response: Response): { message: string } {
    response.clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    });

    response.clearCookie('refreshToken', {
      secure: true,
      sameSite: 'none',
    });
    return {
      message: 'Logged out successfully',
    };
  }

  @Get(ROUTES.AUTH.ME)
  @UseGuards(AccessTokenGuard)
  async getMe(
    @Req() request: AuthenticatedRequest,
  ): Promise<CurrentUserResponseDto> {
    const user = await this._getCurrentUserUseCase.execute(request.user.userId);
    return CurrentUserResponseDto.fromEntity(user);
  }
}
