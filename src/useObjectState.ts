import { useState, useMemo, Dispatch, SetStateAction } from "react";

export const useObjectState = <AF, S>(
  apiFactory: (setState: Dispatch<SetStateAction<S>>) => AF,
  initialState: S
) => {
  const [state, setState] = useState<S>(initialState);
  return {
    ...useMemo(() => apiFactory(setState), [apiFactory, setState]),
    state,
    setState,
  };
};
