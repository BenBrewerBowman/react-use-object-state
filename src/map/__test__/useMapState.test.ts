import { act, renderHook } from "@testing-library/react-hooks";
import { useMapState } from "../useMapState";

describe(useMapState, () => {
  test("defaults empty map with no initial entries", () => {
    const { result } = renderHook(() => useMapState());
    expect(result.current.state.size).toBe(0);
  });

  test("defaults map with initial entries", () => {
    const INITIAL_ENTRIES: readonly [string, number][] = [
      ["first", 1],
      ["second", 2],
      ["third", 3],
    ];
    const { result } = renderHook(() =>
      useMapState<string, number>(INITIAL_ENTRIES)
    );
    expect(result.current.state.size).toBe(INITIAL_ENTRIES.length);
    INITIAL_ENTRIES.forEach((entry, i) => {
      expect(result.current.state.get(entry[0])).toBe(INITIAL_ENTRIES[i][1]);
    });
  });

  test("clear", () => {
    const INITIAL_ENTRIES: readonly [string, number][] = [
      ["first", 1],
      ["second", 2],
      ["third", 3],
    ];
    const { result } = renderHook(() =>
      useMapState<string, number>(INITIAL_ENTRIES)
    );
    expect(result.current.state.size).toBe(INITIAL_ENTRIES.length);
    act(() => {
      result.current.clear();
    });
    expect(result.current.state.size).toBe(0);
  });

  test("set", () => {
    const { result } = renderHook(() => useMapState<string, number>());
    act(() => {
      result.current.set("first", 1);
    });
    expect(result.current.state.get("first")).toBe(1);
    act(() => {
      result.current.set("second", 2);
    });
    expect(result.current.state.get("second")).toBe(2);
    act(() => {
      result.current.set("third", 3);
    });
    expect(result.current.state.get("third")).toBe(3);
  });

  test("delete", () => {
    const INITIAL_ENTRIES: readonly [string, number][] = [
      ["first", 1],
      ["second", 2],
      ["third", 3],
    ];
    const { result } = renderHook(() =>
      useMapState<string, number>(INITIAL_ENTRIES)
    );
    act(() => {
      result.current.delete("first");
    });
    expect(result.current.state.get("first")).toBeUndefined();
    act(() => {
      result.current.delete("second");
    });
    expect(result.current.state.get("second")).toBeUndefined();
    act(() => {
      result.current.delete("third");
    });
    expect(result.current.state.get("third")).toBeUndefined();
  });
});
