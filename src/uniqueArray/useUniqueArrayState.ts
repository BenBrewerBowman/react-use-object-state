import { useObjectState } from "../useObjectState";
import {
  push,
  toggle,
  unshift,
  insertAt,
  upsertAt,
} from "./uniqueArray.reducers";
import { arrayStateFactory, ArrayStateFactory } from "../array/useArrayState";
import { Dispatch, SetStateAction } from "react";

export type UniqueArrayStateFactory<T> = ArrayStateFactory<T> & {
  toggle: (...val: T[]) => void;
};

export const uniqueArrayStateFactory = <T>(
  setState: Dispatch<SetStateAction<T[]>>
): UniqueArrayStateFactory<T> => ({
  ...arrayStateFactory(setState),

  push: (...val: T[]) => setState(push<T>(val)),
  toggle: (...val: T[]) => setState(toggle<T>(val)),

  unshift: (...val: T[]) => setState(unshift<T>(val)),

  insertAt: (val: T, index: number) => setState(insertAt<T>(val, index)),
  upsertAt: (val: T, index: number) => setState(upsertAt<T>(val, index)),
});

export const useUniqueArrayState = <T>(initialState: T[]) =>
  useObjectState<UniqueArrayStateFactory<T>, T[]>(
    uniqueArrayStateFactory,
    initialState
  );
