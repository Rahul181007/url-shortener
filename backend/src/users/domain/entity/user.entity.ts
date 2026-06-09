export class UserEntity {
  private constructor(
    public readonly id: string | null,
    public readonly name: string,
    public readonly email: string,
    public password: string,
  ) {}

  static create(data: { name: string; email: string; password: string }) {
    return new UserEntity(null, data.name, data.email, data.password);
  }
  static rehydrate(data: {
    id: string;
    name: string;
    email: string;
    password: string;
  }) {
    return new UserEntity(data.id, data.name, data.email, data.password);
  }
}
