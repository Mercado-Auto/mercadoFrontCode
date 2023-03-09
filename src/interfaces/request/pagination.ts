export default interface Pagination<T = Record<string, string | number>> {
  pageSize?: number;
  page?: number;
  filters?: T;
  sort_by?: string;
  order_by?: string;
}
