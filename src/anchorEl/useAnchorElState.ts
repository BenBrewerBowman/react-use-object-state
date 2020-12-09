import { useObjectState } from "../useObjectState";
import { Dispatch, SetStateAction } from "react";

export type AnchorElState = null | HTMLElement;

export const anchorElStateFactory = (
  setState: Dispatch<SetStateAction<AnchorElState>>
) => ({
  clearAnchorEl: () => setState(null),
  setAnchorEl: (event: React.MouseEvent<HTMLElement>) => {
    setState(event.currentTarget);
  },
});

export const useAnchorElState = (initialValue: AnchorElState) => {
  const { state: anchorEl, setState, ...args } = useObjectState<
    ReturnType<typeof anchorElStateFactory>,
    AnchorElState
  >(anchorElStateFactory, initialValue);
  return {
    anchorEl,
    ...args,
  };
};
