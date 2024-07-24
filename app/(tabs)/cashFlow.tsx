import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Modal from 'react-native-modal'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CashFlowScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cashActionText, setCashActionText] = useState('')
  const [amountCash, setAmountCash] = useState('')
  const [typeCash, setTypeCash] = useState('')
  const [exampleData, setExampleData] = useState([
    {
      id: 1,
      amount: 50000,
      type: 'income',
      created_at: '16:01, 23/07/2024'
    },
    {
      id: 2,
      amount: 85000,
      type: 'spending',
      created_at: '10:41, 22/07/2024'
    }
  ])

  const showModalandSetType = (actionType = '', typeCash: string) => {
    setCashActionText(actionType)
    setTypeCash(typeCash)
    toggleModal()
  }

  const closeModal = () => {
    setAmountCash('')
    toggleModal()
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const cashFomat = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function generateUniqueId() {
    const now = new Date();
    
    const year = now.getFullYear().toString();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    // Menggabungkan semua bagian menjadi string unik
    const uniqueId = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    
    return uniqueId;
  }
  
  const getCurrentDateTime = () => {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}, ${day}/${month}/${year}`
  }

  const actionForCashFlow = () => {
    const id = generateUniqueId()
    const currentTime = getCurrentDateTime()

    console.log({
      id: id,
      amount: Number(amountCash),
      type: typeCash,
      created_at: currentTime
    })



    // toggleModal()
  }

  return (
    <ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 20}}>
            <Pressable onPress={closeModal}>
              <TabBarIcon name={'close-circle'} />
            </Pressable>
          </View>

          <TextInput
            placeholder='0' keyboardType='numeric' style={styles.inputField}
            value={amountCash}
            onChangeText={newAmount => setAmountCash(newAmount.replace(/[^0-9]/g, ''))}
          />

          <View style={{marginBottom: 20}}></View>

          <Pressable
            style={[styles.cashButton, cashActionText === 'Add Income' ? styles.bgGreen : styles.bgRed]}
            onPress={actionForCashFlow}
          >
            <Text style={[styles.textWhite, {textAlign: 'center'}]}>{cashActionText}</Text>
          </Pressable>
          
        </View>
      </Modal>
      
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

        {exampleData.map((data) => (
          <View style={styles.borderCard} key={data.id}>
            <View style={styles.cashflowCount}>
              <Text style={[styles.textMedium, data.type === 'income' ? styles.textGreen : styles.textRed]}>
                {cashFomat(data.amount)}  {/* <-- amount value */}
              </Text>
              <TabBarIcon
                name={data.type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle'}
                style={[styles.textMedium, data.type === 'income' ? styles.textGreen : styles.textRed]}
              />
            </View>
            <Text style={[styles.textSmall, styles.textGray]}>
              {data.created_at}
            </Text>
          </View>
        ))}

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
  borderCard: {
    borderWidth: 0.5,
    borderColor: '#b5b5b5',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  cashflowCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
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
  }
});
