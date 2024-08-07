import { createGlobalState } from "react-hooks-global-state";

type stateType = {
  totalCash: number,
  totalCashFormated: string,
  allDataCash: any,
  isModalFormVisible: boolean,
  cashActionText: string,
  typeCash: 'income' | 'spending' | '',
  typeCashFilter: 'income' | 'spending' | '',
  monthFilter: string,
  yearFilter: number,
  totalCashFilter: number,
  isFilterIncome: boolean,
  isFilterSpending: boolean,
}

const initialState = <stateType> {
  totalCash: NaN,
  totalCashFormated: '',
  allDataCash: [],
  isModalFormVisible: false,
  cashActionText: '',

  // for create new data
  typeCash: '',
  
  // for filter data
  typeCashFilter: '',
  monthFilter: '',
  yearFilter: 0,
  totalCashFilter: 0,

  // button active style
  isFilterIncome: false,
  isFilterSpending: false,
};
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }