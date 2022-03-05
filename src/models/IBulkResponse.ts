export interface IPages {
  perPage: number;
  nextUrl: string | null;
  previousUrl: string | null;
}
export interface IBulkResponse<T> {
  object: string;
  url: string;
  pages: IPages;
  totalCount: number;
  updatedAt: string;
  data: T[];
}

export interface ICachedData<T> {
  lastFetched: string;
  data: IBulkResponse<T>;
}
