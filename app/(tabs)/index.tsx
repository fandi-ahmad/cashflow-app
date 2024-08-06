import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { useGlobalState } from '@/hooks/useGlobalState';
import CardList from '@/components/home/CardList';
import CheckBox from '@/components/CheckBox';
import ModalForm from '@/components/home/ModalForm';

import AsyncStorage from "@react-native-async-storage/async-storage"
import { cashFormated } from '@/function';

export default function HomeScreen() {
  const [isModalFormVisible, setIsModalFormVisible] = useGlobalState('isModalFormVisible')
  const [cashActionText, setCashActionText] = useGlobalState('cashActionText')
  const [allDataCash, setAllDataCash] = useGlobalState('allDataCash')
  const [typeCash, setTypeCash] = useGlobalState('typeCash')

  const [isFilterIncome, setIsFilterIncome] = useState(false)
  const [isFilterSpending, setIsFilterSpending] = useState(false)

  // filter
  const [totalCashFilter, setTotalCashFilter] = useState<number>()
  const [isShowFilterContainer, setIsShowFilterContainer] = useState<boolean>(false)

  const showModalandSetType = (actionType = '', typeCash: 'income' | 'spending') => {
    setCashActionText(actionType)
    setTypeCash(typeCash)
    toggleModal()
  }

  const toggleModal = () => {
    setIsModalFormVisible(!isModalFormVisible);
  };

  const filtered = (filterType: 'income' | 'spending') => {
    if (filterType === 'income') {
      setIsFilterIncome(!isFilterIncome)
      isFilterSpending ? setIsFilterSpending(false) : null
      isFilterIncome ? setTotalCashFilter(0) : getAllDataCashForFilter('income')
    }

    if (filterType === 'spending') {
      setIsFilterSpending(!isFilterSpending)
      isFilterIncome ? setIsFilterIncome(false) : null
      isFilterSpending ? setTotalCashFilter(0) : getAllDataCashForFilter('spending')
    }

  }
  
  
  const getAllDataCashForFilter = async (filterType: 'income' | 'spending') => {
    const value = await AsyncStorage.getItem('cash');

    if (value) {
      const jsonValue = JSON.parse(value);

      const total = jsonValue.reduce((acc: number, item: any) => {
        if (filterType === 'income' && item.type === "income") {
          return acc + item.amount;
        }

        if (filterType === 'spending' && item.type === 'spending') {
          return acc + item.amount;
        }
        return acc;
      }, 0);

      setTotalCashFilter(total)
    }
  }


  return (
    <ScrollView>

      {/* all function for get data cash in <ModalForm/> components */}
      <ModalForm/>

      <HeroSection/>
      
      <View style={styles.container}>
        <View style={styles.cashButtonContainer}>

          <Pressable style={[styles.cashButton, styles.bgGreen]} onPress={() => showModalandSetType('Add Income', 'income')}>
            <Text style={styles.textWhite}>+ Pemasukan</Text>
          </Pressable>

          <Pressable style={[styles.cashButton, styles.bgRed]} onPress={() => showModalandSetType('Add Spending', 'spending')}>
            <Text style={styles.textWhite}>+ Pengeluaran</Text>
          </Pressable>

        </View>
      </View>


      {/* ===== CASH FLOW START ===== */}
      <View style={styles.container}>

        {/* title head & filter button navigation */}
        <View style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={styles.textMenu}>Catatan Kas</Text>
          <Pressable onPress={() => setIsShowFilterContainer(!isShowFilterContainer)} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TabBarIcon name='filter' size={22} />
            <Text>Filter</Text>
          </Pressable>
        </View>

        { isShowFilterContainer ? 
          <View style={{ backgroundColor: '#dcdcde', borderRadius: 4, padding: 8, marginBottom: 12 }}>
            <Text>Filter bedasarkan:</Text>

            <View style={{paddingTop: 8}}>
              <CheckBox
                title='Pemasukan'
                isChecked={isFilterIncome}
                onPress={() => filtered('income')}
              />
              <CheckBox
                title='Pengeluaran'
                isChecked={isFilterSpending}
                onPress={() => filtered('spending')}
              />
            </View>

            <View>
              <Text style={[styles.textDarkGray, styles.textLarge]}>
                <TabBarIcon name={'wallet'} style={styles.iconWallet} />
                {totalCashFilter ? cashFormated(totalCashFilter) : '0'}
              </Text>
            </View>
          </View>
        : null }


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
  iconWallet: {
    fontSize: 20,
    paddingRight: 8
  },
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
  textDarkGray: {
    color: '#383838'
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
  invalidInput: {
    borderColor: 'red'
  },
});