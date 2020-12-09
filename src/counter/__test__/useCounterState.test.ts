import { renderHook, act } from "@testing-library/react-hooks";
import { useCounterState } from "../useCounterState";

describe("counterState", () => {
  describe("increment", () => {
    test("adds 1 to the count", () => {
      const { result } = renderHook(() => useCounterState());
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toEqual(1);
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toEqual(2);
    });

    test("wont increment past max", () => {
      const initialState = { count: 0, max: 1 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toEqual(1);
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toEqual(1);
    });
  });

  describe("incrementBy", () => {
    test("adds X to the count", () => {
      const initialState = { count: 0 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.incrementBy(5);
      });
      expect(result.current.count).toEqual(5);
      act(() => {
        result.current.incrementBy(10);
      });
      expect(result.current.count).toEqual(15);
    });

    test("wont increment past max", () => {
      const initialState = { count: 0, max: 10 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.incrementBy(5);
      });
      expect(result.current.count).toEqual(5);
      act(() => {
        result.current.incrementBy(10);
      });
      expect(result.current.count).toEqual(10);
    });
  });

  describe("decrement", () => {
    test("removes 1 from the count", () => {
      const initialState = { count: 5 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toEqual(4);
      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toEqual(3);
    });

    test("wont decrement below min", () => {
      const initialState = { count: 1, min: 0 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toEqual(0);
      act(() => {
        result.current.decrement();
      });
      expect(result.current.count).toEqual(0);
    });
  });

  describe("decrementBy", () => {
    test("subtracts X from the count", () => {
      const initialState = { count: 20 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.decrementBy(5);
      });
      expect(result.current.count).toEqual(15);
      act(() => {
        result.current.decrementBy(10);
      });
      expect(result.current.count).toEqual(5);
    });

    test("wont decrement below min", () => {
      const initialState = { count: 10, min: 0 };
      const { result } = renderHook(() => useCounterState(initialState));
      act(() => {
        result.current.decrementBy(5);
      });
      expect(result.current.count).toEqual(5);
      act(() => {
        result.current.decrementBy(10);
      });
      expect(result.current.count).toEqual(0);
    });
  });
});
