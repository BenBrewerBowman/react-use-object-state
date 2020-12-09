export type PaginationOrder = "asc" | "desc";

export type PaginationState = {
  order?: PaginationOrder;
  orderBy?: string;
  page: number;
  rowsPerPage: number;
};
