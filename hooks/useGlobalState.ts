import { createGlobalState } from "react-hooks-global-state";

type stateType = {
  totalCash: number,
  totalCashFormated: string
}

const initialState = <stateType> {
  totalCash: NaN,
  totalCashFormated: ''
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }
