import { renderHook, act } from "@testing-library/react-hooks";
import { useUniqueArrayState } from "../useUniqueArrayState";

beforeEach(jest.resetAllMocks);

describe("uniqueArrayState", () => {
  describe("push", () => {
    test("pushes unique values", () => {
      const initialState = [1, 2, 3];
      const { result } = renderHook(() => useUniqueArrayState(initialState));
      const vals = [1, 2, 3, 4, 5];
      act(() => {
        result.current.push(...vals);
      });
      expect(result.current.state).toEqual(vals);
    });

    test("pushes deep unique values", () => {
      const deepVal1 = { person: { name: "James", age: 21 } };
      const deepVal2 = { person: { name: "Sara", age: 21 } };

      const initialState = [deepVal1];
      const { result } = renderHook(() => useUniqueArrayState(initialState));
      const vals = [deepVal1, deepVal2];
      act(() => {
        result.current.push(...vals);
      });
      expect(result.current.state).toEqual([deepVal1, deepVal2]);
    });
  });

  describe("unshift", () => {
    test("unshifts unique values", () => {
      const initialState = [3, 4, 5];
      const vals = [1, 2, 3, 4, 5];

      const { result } = renderHook(() => useUniqueArrayState(initialState));
      act(() => {
        result.current.unshift(...vals);
      });
      expect(result.current.state).toEqual(vals);
    });

    test("unshifts deep unique values", () => {
      const deepVal1 = { person: { name: "James", age: 21 } };
      const deepVal2 = { person: { name: "Sara", age: 21 } };

      const initialState = [deepVal1];
      const vals = [deepVal1, deepVal2];

      const { result } = renderHook(() => useUniqueArrayState(initialState));
      act(() => {
        result.current.unshift(...vals);
      });
      expect(result.current.state).toEqual([deepVal2, deepVal1]);
    });
  });

  describe("toggle", () => {
    test("toggles unique values", () => {
      const initialState = [1, 2, 3, 4, 5];
      const vals = [1, 2, 3, 6, 7, 8];

      const { result } = renderHook(() => useUniqueArrayState(initialState));
      act(() => {
        result.current.toggle(...vals);
      });
      expect(result.current.state).toEqual([4, 5, 6, 7, 8]);
    });

    test("toggles deep unique values", () => {
      const deepVal1 = { person: { name: "James", age: 21 } };
      const deepVal2 = { person: { name: "Sara", age: 21 } };

      const initialState = [deepVal1];
      const vals = [deepVal1, deepVal2];

      const { result } = renderHook(() => useUniqueArrayState(initialState));
      act(() => {
        result.current.toggle(...vals);
      });
      expect(result.current.state).toEqual([deepVal2]);
    });
  });
});
