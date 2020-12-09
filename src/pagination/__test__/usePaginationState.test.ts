import { renderHook, act } from "@testing-library/react-hooks";
import { PaginationState } from "../types";
import { usePaginationState } from "../usePaginationState";

const DEFAULT_STATE: PaginationState = {
  page: 0,
  rowsPerPage: 10,
};

describe(usePaginationState, () => {
  test("sets page", () => {
    const { result } = renderHook(() => usePaginationState(DEFAULT_STATE));
    const PAGES = [0, 1, 5, 19];
    PAGES.forEach((newPage) => {
      act(() => {
        result.current.setPage(newPage);
      });
      expect(result.current.page).toEqual(newPage);
    });
  });

  test("sets rowsPerPage", () => {
    const { result } = renderHook(() => usePaginationState(DEFAULT_STATE));
    const ROWS_PER_PAGE = [25, 50, 100, 250];
    ROWS_PER_PAGE.forEach((newRowsPerPage) => {
      act(() => {
        result.current.setPage(newRowsPerPage);
      });
      expect(result.current.page).toEqual(newRowsPerPage);
    });
  });

  test("sorts", () => {
    const { result } = renderHook(() => usePaginationState(DEFAULT_STATE));
    act(() => {
      result.current.sort({ order: "asc", orderBy: "someField" });
    });
    expect(result.current.order).toEqual("asc");
    expect(result.current.orderBy).toEqual("someField");
  });

  test("nextPage", () => {
    const { result } = renderHook(() => usePaginationState(DEFAULT_STATE));
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.page).toEqual(1);
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.page).toEqual(2);
  });

  test("previousPage", () => {
    const { result } = renderHook(() =>
      usePaginationState({ ...DEFAULT_STATE, page: 2 })
    );
    act(() => {
      result.current.previousPage();
    });
    expect(result.current.page).toEqual(1);
    act(() => {
      result.current.previousPage();
    });
    expect(result.current.page).toEqual(0);
    act(() => {
      result.current.previousPage();
    });
    expect(result.current.page).toEqual(0);
  });
});
