import { useObjectState } from "../useObjectState";
import { Dispatch, SetStateAction } from "react";

type State = boolean;

export const booleanStateFactory = (
  setState: Dispatch<SetStateAction<State>>
) => ({
  setTrue: () => setState(true),
  setFalse: () => setState(false),
  toggle: () => setState((state) => !state),
});

export const useBooleanState = (initialState: State) =>
  useObjectState<ReturnType<typeof booleanStateFactory>, State>(
    booleanStateFactory,
    initialState
  );
