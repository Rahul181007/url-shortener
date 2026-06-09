import { LoginResponse } from '../../application/dto/loginResponse.dto';

export class LoginResponseDto {
  accessToken!: string;
  user!: {
    id: string;
    name: string;
    email: string;
  };
  static fromApplication(response: LoginResponse): LoginResponseDto {
    return {
      accessToken: response.accessToken,
      user: {
        id: response.user.id!,
        name: response.user.name,
        email: response.user.email,
      },
    };
  }
}
