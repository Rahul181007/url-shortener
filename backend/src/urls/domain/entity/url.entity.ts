export class UrlEntity {
  private constructor(
    public readonly id: string | null,
    public readonly originalUrl: string,
    public readonly shortCode: string,
    public readonly userId: string,
  ) {}
  static create(data: {
    originalUrl: string;
    userId: string;
    shortCode: string;
  }) {
    return new UrlEntity(null, data.originalUrl, data.shortCode, data.userId);
  }
  static rehydrate(data: {
    id: string;
    originalUrl: string;
    shortCode: string;
    userId: string;
  }) {
    return new UrlEntity(
      data.id,
      data.originalUrl,
      data.shortCode,
      data.userId,
    );
  }
}
