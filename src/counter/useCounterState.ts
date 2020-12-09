import { useObjectState } from "../useObjectState";
import { CounterState } from "./types";
import {
  incrementBy,
  decrementBy,
  setCount,
  setMin,
  setMax,
} from "./counter.reducers";
import { Dispatch, SetStateAction } from "react";

export const counterStateFactory = (
  setState: Dispatch<SetStateAction<CounterState>>
) => ({
  increment: () => setState(incrementBy(1)),
  decrement: () => setState(decrementBy(1)),
  incrementBy: (val: number) => setState(incrementBy(val)),
  decrementBy: (val: number) => setState(decrementBy(val)),

  setCount: (count: CounterState["count"]) => setState(setCount(count)),
  setMin: (min: CounterState["min"]) => setState(setMin(min)),
  setMax: (max: CounterState["min"]) => setState(setMax(max)),
});

export const useCounterState = (initialState: CounterState = { count: 0 }) => {
  const {
    state: { count, min, max },
    setState,
    ...counterState
  } = useObjectState<ReturnType<typeof counterStateFactory>, CounterState>(
    counterStateFactory,
    initialState
  );

  return {
    count,
    min,
    max,
    ...counterState,
  };
};
