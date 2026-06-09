import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../dto/loginResponse.dto';

export abstract class LoginUseCase {
  abstract execute(loginData: LoginDto): Promise<LoginResponse>;
}
