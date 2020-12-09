import { 
  insertAt as arrayInsertAt,
  push as arrayPush,
  unshift as arrayUnshift,
  upsertAt as arrayUpsertAt
} from '../array/array.reducers';

const findIndex = <T>(arr: T[], value: T) =>
    arr.findIndex(element => JSON.stringify(element) === JSON.stringify(value));

export const toggle = <T>(values: T[]) => (state: T[]) => {
  const stateCopy = [...state];
  values.forEach(value => {
    const index = findIndex(stateCopy, value);
    if (index >= 0) {
      stateCopy.splice(index, 1);
    } else {
      stateCopy.push(value);
    }
  });
  return stateCopy;
};

export const push = <T>(values: T[]) => (state: T[]) => {
  const uniqueNewVals: T[] = [];
  values.forEach(value => {
    if (findIndex(state, value) < 0) {
      uniqueNewVals.push(value);
    }
  });
  return arrayPush(uniqueNewVals)(state);
};

export const unshift = <T>(values: T[]) => (state: T[]) => {
  const uniqueNewVals: T[] = [];
  values.forEach(value => {
    if (findIndex(state, value) < 0) {
      uniqueNewVals.push(value);
    }
  });
  return arrayUnshift(uniqueNewVals)(state);
};

export const upsertAt = <T>(val: T, index: number) => (state:T[]) => {
  const indexOfVal = findIndex(state, val);
  if (indexOfVal < 0) {
    return arrayUpsertAt<T>(val, index)(state);
  }
  return state;
};

export const insertAt = <T>(val: T, index: number) => (state: T[]) => {
  const indexOfVal = findIndex(state, val);
  if (indexOfVal < 0) {
    return arrayInsertAt<T>(val, index)(state);
  }
  return state;
};