import { useObjectState } from "../useObjectState";
import { PaginationState, PaginationOrder } from "./types";
import { Dispatch, SetStateAction } from "react";

export const paginationStateFactory = (
  setState: Dispatch<SetStateAction<PaginationState>>
) => ({
  setPage: (page: number) => setState((state) => ({ ...state, page })),
  setRowsPerPage: (rowsPerPage: number) =>
    setState((state) => ({ ...state, rowsPerPage })),
  sort: ({ order, orderBy }: { order: PaginationOrder; orderBy: string }) =>
    setState((state) => ({ ...state, order, orderBy })),
  nextPage: () => setState((state) => ({ ...state, page: state.page + 1 })),
  previousPage: () =>
    setState((state) => ({ ...state, page: Math.max(state.page - 1, 0) })),
});

export const usePaginationState = (initialState: PaginationState) => {
  const {
    state: { page, rowsPerPage, order, orderBy },
    setState,
    ...paginationState
  } = useObjectState<
    ReturnType<typeof paginationStateFactory>,
    PaginationState
  >(paginationStateFactory, initialState);

  return {
    page,
    rowsPerPage,
    order,
    orderBy,
    ...paginationState,
  };
};
