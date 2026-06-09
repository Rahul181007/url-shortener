import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlRequestDto {
  @IsNotEmpty()
  @IsUrl()
  originalUrl!: string;
}
