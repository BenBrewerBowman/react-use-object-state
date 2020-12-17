import { useObjectState } from "../useObjectState";
import { Dispatch, SetStateAction } from "react";

export type MapStateFactory<K, V> = {
  clear: VoidFunction;
  set: (key: K, value: V) => void;
  delete: (key: K) => void;
};

export const mapStateFactory = <K, V>(
  setState: Dispatch<SetStateAction<Map<K, V>>>
): MapStateFactory<K, V> => ({
  clear: () => setState(new Map<K, V>()),
  set: (key: K, value: V) =>
    setState((state) => new Map(state.set(key, value))),
  delete: (key: K) =>
    setState((state) => {
      state.delete(key);
      return new Map(state);
    }),
});

type MapEntries<K, V> = readonly (readonly [K, V])[] | null;

export const useMapState = <K, V>(initialEntries?: MapEntries<K, V>) => {
  return useObjectState<MapStateFactory<K, V>, Map<K, V>>(
    mapStateFactory,
    new Map(initialEntries)
  );
};
