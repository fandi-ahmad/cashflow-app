import { View, Text, Pressable, StyleSheet } from "react-native"
import { TabBarIcon } from "../navigation/TabBarIcon"
import BaseInput from "../input/BaseInput"
import BaseInputWithIcon from "../input/BaseInputWithIcon"
import { useState } from "react"
import { useGlobalState } from "@/hooks/useGlobalState"
import Modal  from "react-native-modal"
import { generateUniqueId, getCurrentDateTime } from "@/function"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"

import { getAllDataCash, getAllDataCashByMonth, getAllDataCashByMonthType, getAllDataCashByType } from "@/function/dataCash"

const ModalForm = () => {
  const [isModalFormVisible, setIsModalFormVisible] = useGlobalState('isModalFormVisible')
  const [cashActionText, setCashActionText] = useGlobalState('cashActionText')
  const [typeCash, setTypeCash] = useGlobalState('typeCash')
  const [allDataCash, setAllDataCash] = useGlobalState('allDataCash')
  const [totalCash, setTotalCash] = useGlobalState('totalCash')

  const [note, setNote] = useState<string>('')
  const [amountCash, setAmountCash] = useState('')

  const [isValidNote, setIsValidNote] = useState<boolean>(true)
  const [isValidAmountCash, setIsValidAmountCash] = useState<boolean>(true)

  // for filter data
  const [monthFilter, setMonthFilter] = useGlobalState('monthFilter')
  const [yearFilter, setYearFilter] = useGlobalState('yearFilter')
  const [typeCashFilter, setTypeCashFilter] = useGlobalState('typeCashFilter')
  const [totalCashFilter, setTotalCashFilter] = useGlobalState('totalCashFilter')

  const closeModal = () => {
    setAmountCash('')
    setNote('')
    setIsValidNote(true)
    setIsValidAmountCash(true)
    setTypeCash('')
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalFormVisible(!isModalFormVisible);
  };

  const addNewDataCash = async (newData: any) => {
    const value = await AsyncStorage.getItem('cash');
    let cashData = [];

    if (value === null || value === '') {
      // add data for first time
      const jsonValue = JSON.stringify(newData)
      await AsyncStorage.setItem('cash', jsonValue)
    } else {
      // update data
      cashData = JSON.parse(value);
    }

    // cashData.push(newData);
    cashData.unshift(newData)

    // save array data in AsyncStorage
    const jsonValue = JSON.stringify(cashData);
    await AsyncStorage.setItem('cash', jsonValue);

    getData()
  };


  const actionForCashFlow = () => {
    const id = generateUniqueId();
    const currentTime = getCurrentDateTime();
  
    const trimmedNote = note.trim();  /* <-- check space */
    const unformattedAmount = amountCash.replace(/,/g, '');
    const numericAmount = Number(unformattedAmount);
  
    !trimmedNote ? setIsValidNote(false) : setIsValidNote(true);
    (!numericAmount || numericAmount === 0) ? setIsValidAmountCash(false) : setIsValidAmountCash(true);
  
    if (trimmedNote && numericAmount > 0) {
      const data = {
        id: id,
        amount: numericAmount,
        type: typeCash,
        created_at: currentTime,
        note: trimmedNote,
      };
  
      addNewDataCash(data);
      closeModal();
    }
  };
  


  const getData = async () => {
    let data

    data = await getAllDataCash()
    setTotalCash(data?.totalCash)

    if (monthFilter && typeCashFilter) {
      data = await getAllDataCashByMonthType(monthFilter, yearFilter, typeCashFilter)
      setTotalCashFilter(data?.totalCashFilter)
    }
    
    if (monthFilter && !typeCashFilter) {
      data = await getAllDataCashByMonth(monthFilter, yearFilter)
      setTotalCashFilter(data?.totalCashFilter)
    }
    
    if (!monthFilter && typeCashFilter) {
      data = await getAllDataCashByType(typeCashFilter)      
      setTotalCashFilter(data?.totalCashFilter)
    }
    setAllDataCash(data?.data)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <Modal isVisible={isModalFormVisible}>
      <View style={styles.modalContainer}>
        <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 20}}>
          <Pressable onPress={closeModal}>
            <TabBarIcon name={'close-circle'} />
          </Pressable>
        </View>

        <BaseInput
          label='note'
          placeholder='typing here'
          value={note}
          onChangeText={newText => setNote(newText)}
          styleAdd={!isValidNote && styles.invalidInput}
        />

        <BaseInputWithIcon
          icon='Rp' label='cash' placeholder='0'
          keyboardType='numeric'
          value={amountCash}
          onChangeText={newAmount => {
            let formattedAmount = newAmount.replace(/[^0-9]/g, '');
            if (formattedAmount === '0') formattedAmount = '';
            setAmountCash(formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          }}
          styleAdd={!isValidAmountCash && styles.invalidInput}
        />

        <Pressable
          style={[styles.cashButton, cashActionText === 'Add Income' ? styles.bgGreen : styles.bgRed]}
          onPress={actionForCashFlow}
        >
          <Text style={[{textAlign: 'center', color: 'white'}]}>{cashActionText}</Text>
        </Pressable>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4
  },
  invalidInput: {
    borderColor: 'red'
  },
  cashButton: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
  },
  bgGreen: {
    backgroundColor: '#1bb55b'
  },
  bgRed: {
    backgroundColor: '#e01b42'
  },
})

export default ModalForm