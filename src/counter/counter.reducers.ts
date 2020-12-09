import { CounterState } from "./types";

export const incrementBy = (val: number) => (state: CounterState) => {
  const { max, count = 0 } = state;
  if (max !== undefined && count + val > max) {
    return({ ...state, count: max });
  } else {
    return({ ...state, count: count + val });
  }
};

export const decrementBy = (val: number) => (state: CounterState) => {
  const { min, count = 0 } = state;
  if (min !== undefined && count - val <= min) {
    return({ ...state, count: min });
  } else {
    return({ ...state, count: count - val });
  }
};

export const setCount = (count: CounterState['count']) => (state: CounterState) => ({...state, count });

export const setMin = (min: CounterState['min']) => (state: CounterState) => ({...state, min });

export const setMax = (max: CounterState['max']) => (state: CounterState) => ({...state, max });