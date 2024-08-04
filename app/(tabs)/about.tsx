import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Modal from 'react-native-modal'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalState } from '@/hooks/useGlobalState';

const DeleteMessage = ({closeButton, deleteButton}: any) => {
  return (
    <View id='deleteMessage'>
      <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 28}}>
        <Pressable onPress={closeButton}>
          <TabBarIcon name={'close-circle'} />
        </Pressable>
      </View>

      <Text style={{ textAlign: 'center', fontSize: 18 }}>
        Are you sure you want to delete all charge data?
      </Text>

      <Pressable onPress={deleteButton} style={[styles.baseButton, styles.bgRed]}>
        <Text style={{color: 'white'}}>Yes, delete it</Text>
      </Pressable>
    </View>
  )
}

const WaitingMessage = () => {
  return (
    <Text id='waitingMessage' style={{ textAlign: 'center' }}>
      Please Waiting ...
    </Text>
  )
}

const SuccessMessage = ({backButton}: any) => {
  return (
    <View id='successMessage' style={{ display: 'flex', justifyContent: 'center' }}>
      <TabBarIcon name='checkmark-circle' style={{ fontSize: 52, color: '#1bb55b', margin: 'auto' }} />
      <Text style={{ textAlign: 'center', fontSize: 18 }}>
        Delete data successfully
      </Text>
      <Pressable onPress={backButton} style={[styles.baseButton, styles.bgGray]}>
        <Text style={{color: 'white'}}>Back</Text>
      </Pressable>
    </View>
  )
}


export default function AboutScreen() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'delete' | 'waiting' | 'success'>('delete')
  const [allDataCash, setAllDataCash] = useGlobalState('allDataCash')
  const [totalCash, setTotalCash] = useGlobalState('totalCash')

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleModalMessage = () => {
    if (modalType === 'delete') {
      return <DeleteMessage closeButton={toggleModal} deleteButton={deleteAllData} />
    } else if (modalType === 'waiting') {
      return <WaitingMessage/>
    } else {
      return <SuccessMessage backButton={toggleModal} />
    }
  }

  const openModalDelete = () => {
    toggleModal()
    setModalType('delete')
  }

  const deleteAllData = async () => {
    setModalType('waiting')

    await AsyncStorage.setItem('cash', '')
    setTotalCash(NaN)
    setAllDataCash([])

    setModalType('success')
  }

  return (
    <ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          {handleModalMessage()}
        </View>
      </Modal>

      <View style={styles.container}>

        <Text style={{ fontWeight: 600, fontSize: 20, paddingBottom: 12, paddingLeft: 12 }}>Option</Text>

        <View>
          <Pressable onPress={openModalDelete} style={styles.listMenu}>
            <TabBarIcon name={'trash'} style={styles.listIcon} />
            <Text>Delete All Data Cash</Text>
          </Pressable>
        </View>  
      
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 8,
  },
  listMenu: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#b5b5b5',
    borderRadius: 4,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listIcon: {
    fontSize: 22
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4
  },
  baseButton: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    margin: 'auto',
    marginTop: 28
  },
  bgRed: {
    backgroundColor: '#e01b42'
  },
  bgGray: {
    backgroundColor: '#575757'
  },
});
