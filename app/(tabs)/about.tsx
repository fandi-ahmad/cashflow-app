import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { StyleSheet, Text, View, ScrollView, Pressable, Linking } from 'react-native';
import Modal from 'react-native-modal'
import { useState, useCallback } from 'react';
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
        Yakin ingin menghapus semua data kas?
      </Text>

      <Pressable onPress={deleteButton} style={[styles.baseButton, styles.bgRed]}>
        <Text style={{color: 'white'}}>Ya, hapus saja</Text>
      </Pressable>
    </View>
  )
}

const WaitingMessage = () => {
  return (
    <Text id='waitingMessage' style={{ textAlign: 'center' }}>
      Tunggu sebentar ...
    </Text>
  )
}

const SuccessMessage = ({backButton}: any) => {
  return (
    <View id='successMessage' style={{ display: 'flex', justifyContent: 'center' }}>
      <TabBarIcon name='checkmark-circle' style={{ fontSize: 52, color: '#1bb55b', margin: 'auto' }} />
      <Text style={{ textAlign: 'center', fontSize: 18 }}>
        Data kas berhasil dihapus!
      </Text>
      <Pressable onPress={backButton} style={[styles.baseButton, styles.bgGray]}>
        <Text style={{color: 'white'}}>Kembali</Text>
      </Pressable>
    </View>
  )
}


export default function AboutScreen() {
  const [isModalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);
  const [isModalAboutVisible, setIsModalAboutVisible] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'delete' | 'waiting' | 'success'>('delete')
  const [allDataCash, setAllDataCash] = useGlobalState('allDataCash')
  const [totalCash, setTotalCash] = useGlobalState('totalCash')

  const toggleModal = () => {
    setModalDeleteVisible(!isModalDeleteVisible);
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

  const url = 'https://fandi-ahmad.vercel.app/'
  const handleClickProfile = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    supported ? await Linking.openURL(url) : null
  }, [url]);

  return (
    <ScrollView>

      <Modal isVisible={isModalDeleteVisible}>
        <View style={styles.modalContainer}>
          {handleModalMessage()}
        </View>
      </Modal>

      <Modal isVisible={isModalAboutVisible}>
        <View style={styles.modalContainer}>
          <View style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 18}}>
          <Pressable onPress={() => setIsModalAboutVisible(false)}>
            <TabBarIcon name={'close-circle'} />
          </Pressable>
        </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: 600, marginBottom: 18}}>Catatan Kas V.1.0.0</Text>
            <Text style={{marginBottom: 6}}>Aplikasi ini dibuat untuk mencatat kas masuk dan keluar.</Text>
            <Text style={{marginBottom: 24}}>Dikembangkan oleh Fandi Ahmad</Text>
            <Pressable onPress={handleClickProfile}>
              <Text style={{color: '#3b4bf7', textDecorationLine: 'underline'}}>Kunjungi profil pengembang</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>

        <Text style={{ fontWeight: 600, fontSize: 20, paddingBottom: 12, paddingLeft: 12 }}>Option</Text>

        <View>
          <Pressable onPress={openModalDelete} style={styles.listMenu}>
            <TabBarIcon name={'trash'} style={styles.listIcon} />
            <Text>Hapus semua data kas</Text>
          </Pressable>
          <Pressable onPress={() => setIsModalAboutVisible(true)} style={styles.listMenu}>
            <TabBarIcon name={'information-circle'} style={styles.listIcon} />
            <Text>Tentang</Text>
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
