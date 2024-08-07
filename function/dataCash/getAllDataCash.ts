import AsyncStorage from "@react-native-async-storage/async-storage"

const getAllDataCash = async () => {
  const value = await AsyncStorage.getItem('cash');

  if (value) {
    const allDataCash = JSON.parse(value);
    
    // save total cash in global state
    const totalCash = allDataCash.reduce((acc: number, item: any) => {
      if (item.type === "spending") {
        return acc - item.amount;
      } else if (item.type === "income") {
        return acc + item.amount;
      }
      return acc;
    }, 0);

    return {
      data: allDataCash,
      totalCash: totalCash,
      totalCashFilter: 0
    }
  } else {
    return null
  }

}

export default getAllDataCash