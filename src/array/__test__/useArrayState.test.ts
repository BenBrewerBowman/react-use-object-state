import { useArrayState } from "../useArrayState";
import { renderHook, act } from "@testing-library/react-hooks";

describe("arrayState", () => {
  describe("clear", () => {
    test("clears the array state", () => {
      const initialState = [1, 2, 3];
      const { result } = renderHook(() => useArrayState(initialState));
      act(() => {
        result.current.clear();
      });
      expect(result.current.state).toEqual([]);
    });
  });

  describe("push", () => {
    test("pushes to the end of the array", () => {
      const initialState: number[] = [];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.push(1);
      });
      expect(result.current.state).toEqual([1]);
      act(() => {
        result.current.push(2);
      });
      expect(result.current.state).toEqual([1, 2]);
    });
  });

  describe("pop", () => {
    test("pops states from the end of the array", () => {
      const initialState: number[] = [1, 2];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.pop();
      });
      expect(result.current.state).toEqual([1]);
      act(() => {
        result.current.pop();
      });
      expect(result.current.state).toEqual([]);
    });

    test("popping an empty array does nothing", () => {
      const initialState: number[] = [];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.pop();
      });
      expect(result.current.state).toEqual([]);
    });
  });

  describe("shift", () => {
    test("pops off one element from the start of the array", () => {
      const initialState: number[] = [1, 2, 3];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.shift();
      });
      expect(result.current.state).toEqual([2, 3]);
      act(() => {
        result.current.shift();
      });
      expect(result.current.state).toEqual([3]);
      act(() => {
        result.current.shift();
      });
      expect(result.current.state).toEqual([]);
    });

    test("shifting an empty array does nothing", () => {
      const initialState: number[] = [];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.shift();
      });
      expect(result.current.state).toEqual([]);
    });
  });

  describe("unshift", () => {
    test("pushes elements onto the start of the array", () => {
      const initialState: number[] = [];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.unshift(3, 4);
      });
      expect(result.current.state).toEqual([3, 4]);
      act(() => {
        result.current.unshift(1, 2);
      });
      expect(result.current.state).toEqual([1, 2, 3, 4]);
    });
  });
  describe("reverse", () => {
    test("reverses an array", () => {
      const initialState: number[] = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.reverse();
      });
      expect(result.current.state).toEqual([5, 4, 3, 2, 1]);
      act(() => {
        result.current.reverse();
      });
      expect(result.current.state).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("insertAt", () => {
    test("inserts states into an array at index", () => {
      const initialState: string[] = ["Banana", "Pineapple"];
      const { result } = renderHook(() => useArrayState<string>(initialState));
      act(() => {
        result.current.insertAt("Mango", 1);
      });
      expect(result.current.state).toEqual(["Banana", "Mango", "Pineapple"]);
      act(() => {
        result.current.insertAt("Apple", 0);
      });
      expect(result.current.state).toEqual([
        "Apple",
        "Banana",
        "Mango",
        "Pineapple",
      ]);
      act(() => {
        result.current.insertAt("Peach", 3);
      });
      expect(result.current.state).toEqual([
        "Apple",
        "Banana",
        "Mango",
        "Peach",
        "Pineapple",
      ]);
    });

    test("inserting out of bounds does nothing", () => {
      const initialState: number[] = [1, 2, 3];
      const { result } = renderHook(() => useArrayState<number>(initialState));
      act(() => {
        result.current.insertAt(100, 4);
      });
      expect(result.current.state).toEqual([1, 2, 3]);
      act(() => {
        result.current.insertAt(-100, -1);
      });
      expect(result.current.state).toEqual([1, 2, 3]);
    });
  });

  describe("upsertAt", () => {
    test("replaces state of array at index", () => {
      const initialState: string[] = ["Apple", "Peach", "Pear"];
      const { result } = renderHook(() => useArrayState<string>(initialState));
      act(() => {
        result.current.upsertAt("Grapefruit", 1);
      });
      expect(result.current.state).toEqual(["Apple", "Grapefruit", "Pear"]);
      act(() => {
        result.current.upsertAt("Banana", 0);
      });
      expect(result.current.state).toEqual(["Banana", "Grapefruit", "Pear"]);
      act(() => {
        result.current.upsertAt("Nectarine", 2);
      });
      expect(result.current.state).toEqual([
        "Banana",
        "Grapefruit",
        "Nectarine",
      ]);
    });

    test("upserting out of bounds does nothing", () => {
      const initialState: string[] = ["Apple", "Peach", "Pear"];
      const { result } = renderHook(() => useArrayState<string>(initialState));
      act(() => {
        result.current.upsertAt("Grapefruit", -1);
      });
      expect(result.current.state).toEqual(["Apple", "Peach", "Pear"]);
      act(() => {
        result.current.upsertAt("Banana", 3);
      });
      expect(result.current.state).toEqual(["Apple", "Peach", "Pear"]);
    });
  });

  describe("deleteAt", () => {
    test("deletes the element at index", () => {
      const initialState: string[] = [
        "Apple",
        "Banana",
        "Grapefruit",
        "Peach",
        "Pear",
      ];
      const { result } = renderHook(() => useArrayState<string>(initialState));
      act(() => {
        result.current.deleteAt(2);
      });
      expect(result.current.state).toEqual([
        "Apple",
        "Banana",
        "Peach",
        "Pear",
      ]);
      act(() => {
        result.current.deleteAt(0);
      });
      expect(result.current.state).toEqual(["Banana", "Peach", "Pear"]);
      act(() => {
        result.current.deleteAt(2);
      });
      expect(result.current.state).toEqual(["Banana", "Peach"]);
    });

    test("does nothing if delete index is out of bounds", () => {
      const initialState: string[] = ["Apple", "Banana"];
      const { result } = renderHook(() => useArrayState<string>(initialState));
      act(() => {
        result.current.deleteAt(2);
      });
      expect(result.current.state).toEqual(["Apple", "Banana"]);
      act(() => {
        result.current.deleteAt(-1);
      });
      expect(result.current.state).toEqual(["Apple", "Banana"]);
    });
  });
});
