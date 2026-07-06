import { LoginDto } from '../dto/login.dto';

export class AuthApplicationMapper {
  static toLoginDto(loginData: LoginDto): LoginDto {
    const dto = new LoginDto();
    dto.email = loginData.email;
    dto.password = loginData.password;
    return dto;
  }
}
