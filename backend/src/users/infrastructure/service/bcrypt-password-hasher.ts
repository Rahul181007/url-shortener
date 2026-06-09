import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../../domain/service/password-hasher';
import bcrypt from 'bcrypt';
@Injectable()
export class BcryptPasswordHasher extends PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
