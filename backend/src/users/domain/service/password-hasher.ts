export abstract class PasswordHasher {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hashPassword: string): Promise<boolean>;
}
