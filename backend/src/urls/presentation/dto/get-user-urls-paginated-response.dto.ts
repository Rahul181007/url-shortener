import { GetUserUrlsResponseDto } from './get-user-urls-response.dto';

export class GetUserUrlsPaginatedResponseDto {
  urls!: GetUserUrlsResponseDto[];
  page!: number;
  limit!: number;
  total!: number;
  totalPages!: number;
}
