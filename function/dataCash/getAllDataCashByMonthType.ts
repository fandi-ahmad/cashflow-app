import AsyncStorage from "@react-native-async-storage/async-storage"
import filterByMonthYear from "./components/filterByMonthYear";

const getAllDataCashByMonthType = async (month: string, year: number, typeCash: 'income' | 'spending') => {
  const value = await AsyncStorage.getItem('cash');
  if (value) {
    const jsonValue = JSON.parse(value);
    const filteredDataByMonthYear = filterByMonthYear(jsonValue, month, year)

    const filteredDataByMonthType = filteredDataByMonthYear.filter((item: any) => item.type === typeCash);
    const totalAmount = filteredDataByMonthType.reduce((total: number, item: any) => total + item.amount, 0);
    
    return {
      data: filteredDataByMonthType,
      totalCashFilter: totalAmount
    }
  } else {
    return null
  }
}

export default getAllDataCashByMonthType