import { useAnchorElState } from "../useAnchorElState";
import { renderHook, act } from "@testing-library/react-hooks";

describe("anchorElState", () => {
  test("clears the anchored element", () => {
    const initialState = { currentTarget: {} } as any;
    const { result } = renderHook(() => useAnchorElState(initialState));
    act(() => {
      result.current.clearAnchorEl();
    });
    expect(result.current.anchorEl).toEqual(null);
  });

  test("sets the anchored element", () => {
    const { result } = renderHook(() => useAnchorElState(null));
    const mockElement = { currentTarget: {} } as any;
    act(() => {
      result.current.setAnchorEl(mockElement);
    });
    expect(result.current.anchorEl).toEqual(mockElement.currentTarget);
  });
});
