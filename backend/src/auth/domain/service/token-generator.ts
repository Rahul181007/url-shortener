export interface JwtPayload {
  userId: string;
}
export abstract class TokenGenerator {
  abstract generateAccessToken(payload: JwtPayload): Promise<string>;
  abstract generateRefreshToken(payload: JwtPayload): Promise<string>;
  abstract verifyRefreshToken(token: string): Promise<JwtPayload>;
  abstract verifyAccessToken(token: string): Promise<JwtPayload>;
}
