export interface IApiResponse<T> {
  success?: boolean;
  data?: T | IMultiItemsResponse<T>;
  error?: string;
  message?: string | any[];
}

export interface IMultiItemsResponse<T> {
  items: T[];
  total: number;
}
