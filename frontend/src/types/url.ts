export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
}
export interface PaginatedUrls {
  urls: Url[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}