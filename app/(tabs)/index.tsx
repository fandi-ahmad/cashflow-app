import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Modal from 'react-native-modal'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeroSection } from '@/components/HeroSection';
import { useGlobalState } from '@/hooks/useGlobalState';
import { generateUniqueId, getCurrentDateTime } from '@/function';
import CardList from '@/components/home/CardList';

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cashActionText, setCashActionText] = useState('')
  const [allDataCash, setAllDataCash] = useGlobalState('allDataCash')
  const [totalCash, setTotalCash] = useGlobalState('totalCash')

  const [amountCash, setAmountCash] = useState('')
  const [typeCash, setTypeCash] = useState('')
  const [note, setNote] = useState<string>('')

  const showModalandSetType = (actionType = '', typeCash: string) => {
    setCashActionText(actionType)
    setTypeCash(typeCash)
    toggleModal()
  }

  const closeModal = () => {
    setAmountCash('')
    setNote('')
    toggleModal()
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const actionForCashFlow = () => {
    const id = generateUniqueId()
    const currentTime = getCurrentDateTime()

    const data = {
      id: id,
      amount: Number(amountCash),
      type: typeCash,
      created_at: currentTime,
      note: note,
    }

    addNewDataCash(data)
    closeModal()
  }

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

    getAllDataCash()
  };

  const getAllDataCash = async () => {
    const value = await AsyncStorage.getItem('cash');

    if (value) {
      const jsonValue = JSON.parse(value);
      setAllDataCash(jsonValue)

      // save total cash in global state
      const total = jsonValue.reduce((acc: number, item: any) => {
        if (item.type === "spending") {
          return acc - item.amount;
        } else if (item.type === "income") {
          return acc + item.amount;
        }
        return acc;
      }, 0);

      setTotalCash(total)
    }
  }
  
  useEffect(() => {
    getAllDataCash()
  }, [])

  return (
    <ScrollView>

      {/* ===== MODAL START ===== */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 20}}>
            <Pressable onPress={closeModal}>
              <TabBarIcon name={'close-circle'} />
            </Pressable>
          </View>

          <Text style={{paddingBottom: 8}}>*note</Text>
          <TextInput
            placeholder='typing here' style={styles.inputField}
            placeholderTextColor='#888888'
            value={note}
            onChangeText={newText => setNote(newText)}
          />

          <Text style={{paddingBottom: 8}}>*amount</Text>
          <TextInput
            placeholder='0' keyboardType='numeric' style={styles.inputField}
            placeholderTextColor='#888888'
            value={amountCash}
            onChangeText={newAmount => setAmountCash(newAmount.replace(/[^0-9]/g, ''))}
          />

          <Pressable
            style={[styles.cashButton, cashActionText === 'Add Income' ? styles.bgGreen : styles.bgRed]}
            onPress={actionForCashFlow}
          >
            <Text style={[styles.textWhite, {textAlign: 'center'}]}>{cashActionText}</Text>
          </Pressable>

        </View>
      </Modal>
      {/* ===== MODAL END ===== */}

      <HeroSection/>
      
      <View style={styles.container}>
        <View style={styles.cashButtonContainer}>

          <Pressable style={[styles.cashButton, styles.bgGreen]} onPress={() => showModalandSetType('Add Income', 'income')}>
            <Text style={styles.textWhite}>Add Income</Text>
          </Pressable>

          <Pressable style={[styles.cashButton, styles.bgRed]} onPress={() => showModalandSetType('Add Spending', 'spending')}>
            <Text style={styles.textWhite}>Add Spending</Text>
          </Pressable>

        </View>
      </View>


      {/* ===== CASH FLOW START ===== */}
      <View style={styles.container}>
        <Text style={styles.textMenu}>Cash Flow</Text>

        { allDataCash ? allDataCash.map((data: any) => (
          <CardList
            key={data.id}
            type={data.type}
            amount={data.amount}
            created_at={data.created_at}
            note={data.note || '-'}
          />
        )) : null}

      </View>
      {/* ===== CASH FLOW END ===== */}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    color: '#ffffff'
  },
  textLarge: {
    fontSize: 28,
    fontWeight: 700
  },
  textMedium: {
    fontSize: 16,
    fontWeight: 500
  },
  textSmall: {
    fontSize: 12
  },
  textBlue: {
    color: '#3b4bf7'
  },
  textGreen: {
    color: '#1bb55b'
  },
  textRed: {
    color: '#e01b42'
  },
  textGray: {
    color: '#545454'
  },
  container: {
    paddingTop: 18,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20
  },
  textMenu: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12
  },
  addBottom: {
    marginBottom: 18,
  },
  iconMenu: {
    color: '#2f3dc2'
  },
  iconText: {
    fontSize: 12,
    paddingTop: 2
  },
  cashButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 18
  },
  cashButton: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
  },
  bgBlue: {
    backgroundColor: '#2f3dc2',
  },
  bgGreen: {
    backgroundColor: '#1bb55b'
  },
  bgRed: {
    backgroundColor: '#e01b42'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#b5b5b5',
    borderRadius: 4,
    padding: 8,
    marginBottom: 20
  }
});