import { createGlobalState } from "react-hooks-global-state";

type stateType = {
  totalCash: number,
  totalCashFormated: string,
  allDataCash: any,
}

const initialState = <stateType> {
  totalCash: NaN,
  totalCashFormated: '',
  allDataCash: [],
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }
