import AsyncStorage from "@react-native-async-storage/async-storage"
import filterByMonthYear from "./components/filterByMonthYear";

const getAllDataCashByMonth = async (month: string, year: number) => {
  const value = await AsyncStorage.getItem('cash');
  if (value) {
    const jsonValue = JSON.parse(value);
    const filteredDataByMonthYear = filterByMonthYear(jsonValue, month, year)

    return {
      data: filteredDataByMonthYear,
      totalCashFilter: 0
    }
  } else {
    return null
  }
}

export default getAllDataCashByMonth