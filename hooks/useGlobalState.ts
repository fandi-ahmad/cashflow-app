import { createGlobalState } from "react-hooks-global-state";

type stateType = {
  totalCash: number,
  totalCashFormated: string,
  allDataCash: any,
  isModalFormVisible: boolean,
  cashActionText: string,
  typeCash: 'income' | 'spending',
}

const initialState = <stateType> {
  totalCash: NaN,
  totalCashFormated: '',
  allDataCash: [],
  isModalFormVisible: false,
  cashActionText: '',
  typeCash: 'income',
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }