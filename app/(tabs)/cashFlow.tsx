import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Modal from 'react-native-modal'
import { useState } from 'react';

export default function CashFlowScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cashActionText, setCashActionText] = useState('')

  const toggleModal = (actionType = '') => {
    setModalVisible(!isModalVisible);
    setCashActionText(actionType)
  };

  return (
    <ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => toggleModal()} style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 20}}>
            <TabBarIcon name={'close-circle'} />
          </Pressable>

          <TextInput placeholder='0' keyboardType='numeric' style={styles.inputField} />

          <View style={{marginBottom: 20}}></View>

          <Pressable
            style={[styles.cashButton, cashActionText === 'Add Income' ? styles.bgGreen : styles.bgRed]}
            onPress={() => toggleModal()}
          >
            <Text style={[styles.textWhite, {textAlign: 'center'}]}>{cashActionText}</Text>
          </Pressable>
          

        </View>
      </Modal>
      
      <View style={styles.container}>
        <View style={styles.cashButtonContainer}>

          <Pressable style={[styles.cashButton, styles.bgGreen]} onPress={() => toggleModal('Add Income')}>
            <Text style={styles.textWhite}>Add Income</Text>
          </Pressable>

          <Pressable style={[styles.cashButton, styles.bgRed]} onPress={() => toggleModal('Add Spending')}>
            <Text style={styles.textWhite}>Add Spending</Text>
          </Pressable>

        </View>
      </View>


      {/* ===== CASH FLOW START ===== */}
      <View style={styles.container}>
        <Text style={styles.textMenu}>Cash Flow</Text>

        <View style={styles.borderCard}>
          <View style={styles.cashflowCount}>
            <Text style={[styles.textMedium, styles.textGreen]}>150,000</Text>
            <TabBarIcon name={'arrow-up-circle'} style={[styles.textMedium, styles.textGreen]} />
          </View>
          <Text style={[styles.textSmall, styles.textGray]}>14:03, 23/07/2024</Text>
        </View>

        <View style={styles.borderCard}>
          <View style={styles.cashflowCount}>
            <Text style={[styles.textMedium, styles.textRed]}>70,000</Text>
            <TabBarIcon name={'arrow-down-circle'} style={[styles.textMedium, styles.textRed]} />
          </View>
          <Text style={[styles.textSmall, styles.textGray]}>10:41, 22/07/2024</Text>
        </View>

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
