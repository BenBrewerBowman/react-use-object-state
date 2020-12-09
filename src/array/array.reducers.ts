export const deleteAt = <T>(index: number) => (state: T[]) => {
  if (index >= 0 && index < state.length) {
    return([
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length)
    ]);
  }
  return state;
};

export const clear = () => [];

export const pop = <T>(state: T[]) => {
  if (state.length > 0) {
    return([...state.slice(0, state.length - 1)]);
  }
  return state;
};

export const push = <T>(val: T[]) => (state: T[]) => [...state, ...val];

export const shift = <T>(state: T[]) => {
  if (state.length > 0) {
    return deleteAt<T>(0)(state);
  }
  return state;
};

export const unshift = <T>(val: T[]) => (state: T[]) => [...val, ...state];

export const reverse = <T>(state: T[]) => [...state.reverse()];

export const insertAt = <T>(val: T, index: number) => (state: T[]) => {
  if (index >= 0 && index < state.length) {
    return([
      ...state.slice(0, index),
      val,
      ...state.slice(index)
    ]);
  }
  return state;
};

export const upsertAt = <T>(val: T, index: number) => (state: T[]) => {
  if (index >= 0 && index < state.length) {
    state[index] = val;
    return([...state]);
  }
  return state;
};