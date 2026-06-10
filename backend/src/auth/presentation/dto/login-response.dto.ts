import { LoginResponse } from '../../application/dto/loginResponse.dto';

export class LoginResponseDto {
  user!: {
    id: string;
    name: string;
    email: string;
  };
  static fromApplication(response: LoginResponse): LoginResponseDto {
    return {
      user: {
        id: response.user.id!,
        name: response.user.name,
        email: response.user.email,
      },
    };
  }
}
