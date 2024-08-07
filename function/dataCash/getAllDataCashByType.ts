import AsyncStorage from "@react-native-async-storage/async-storage"

const getAllDataCashByType = async (typeCash: 'income' | 'spending' | '') => {
  const value = await AsyncStorage.getItem('cash');
  if (value) {
    const jsonValue = JSON.parse(value);
    const filteredData = typeCash ? jsonValue.filter((item: any) => item.type === typeCash) : jsonValue;
    const totalAmount = typeCash ? filteredData.reduce((acc: number, item: any) => acc + item.amount, 0) : 0;

    return {
      data: filteredData,
      totalCashFilter: totalAmount
    }
  } else {
    return null
  }
}

export default getAllDataCashByType