import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { useGlobalState } from '@/hooks/useGlobalState';
import CardList from '@/components/home/CardList';
import ModalForm from '@/components/home/ModalForm';
import { cashFormated } from '@/function';
import Modal from "react-native-modal"
import MonthOption from '@/components/home/MonthOption';
import { getAllDataCashByMonth, getAllDataCashByType, getAllDataCashByMonthType, getAllDataCash } from '@/function/dataCash';

export default function HomeScreen() {
  const [isModalFormVisible, setIsModalFormVisible] = useGlobalState('isModalFormVisible')
  const [cashActionText, setCashActionText] = useGlobalState('cashActionText')
  const [allDataCash, setAllDataCash] = useGlobalState('allDataCash')
  const [typeCash, setTypeCash] = useGlobalState('typeCash')

  // button active style
  const [isFilterIncome, setIsFilterIncome] = useGlobalState('isFilterIncome')
  const [isFilterSpending, setIsFilterSpending] = useGlobalState('isFilterSpending')

  // filter
  const [totalCashFilter, setTotalCashFilter] = useGlobalState('totalCashFilter')
  const [isShowFilterContainer, setIsShowFilterContainer] = useState<boolean>(false)
  const [typeCashFilter, setTypeCashFilter] = useGlobalState('typeCashFilter')

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
      isFilterIncome ? getAllDataCashForFilter('') : getAllDataCashForFilter('income')
      isFilterIncome ? setTypeCashFilter('') : setTypeCashFilter(filterType)
    }

    if (filterType === 'spending') {
      setIsFilterSpending(!isFilterSpending)
      isFilterIncome ? setIsFilterIncome(false) : null
      isFilterSpending ? getAllDataCashForFilter('') : getAllDataCashForFilter('spending')
      isFilterSpending ? setTypeCashFilter('') : setTypeCashFilter(filterType)
    }

  }
  
  
  const getAllDataCashForFilter = async (filterType: 'income' | 'spending' | '') => {
    if (month) {
      getDataByMonth()
    } else {
      const data = await getAllDataCashByType(filterType)
      setAllDataCash(data?.data)
      setTotalCashFilter(data?.totalCashFilter)
    }
  }


  const [isModalMonthVisible, setIsModalMonthVisible] = useState<boolean>(false)
  const [year, setYear] = useGlobalState('yearFilter')
  const [month, setMonth] = useGlobalState('monthFilter')  /* <-- in number */

  const getCurrentYear = () => {
    const currentYear = new Date().getFullYear()
    setYear(currentYear)
  };

  const showModalMonth = () => {
    setIsModalMonthVisible(true)
  }

  const getDataByMonth = async () => {
    if (month) {
      const data = typeCashFilter
        ? await getAllDataCashByMonthType(month, year, typeCashFilter)
        : await getAllDataCashByMonth(month, year)

      setAllDataCash(data?.data);
      setTotalCashFilter(data?.totalCashFilter);
    } else {
      const data = typeCashFilter
        ? await getAllDataCashByType(typeCashFilter)
        : await getAllDataCash()

      setAllDataCash(data?.data)
      setTotalCashFilter(data?.totalCashFilter)
    }

  }

  const handleSetMonthButton = () => {
    getDataByMonth()
    setIsModalMonthVisible(false)
  }

  useEffect(() => {
    getCurrentYear()
  }, [])

  useEffect(() => {
    getDataByMonth()
  }, [typeCashFilter])

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

            <View style={{paddingTop: 8, display: 'flex', flexDirection: 'row', gap: 8, marginBottom: 8}}>
              <Pressable onPress={() => filtered('income')} style={isFilterIncome ? styles.optionCashRoundedSelected : styles.optionCashRounded}>
                <Text style={{color: isFilterIncome ? 'white' : ''}}>Pemasukan</Text>
              </Pressable>

              <Pressable onPress={() => filtered('spending')} style={isFilterSpending ? styles.optionCashRoundedSelected : styles.optionCashRounded}>
                <Text style={{color: isFilterSpending ? 'white' : ''}}>Pengeluaran</Text>
              </Pressable>
            </View>

            <Pressable onPress={showModalMonth} style={({ pressed }) => [pressed ? styles.bgSelected : styles.bgBase, styles.optionFilter]}>
              {({pressed}) => (
                <>
                  <TabBarIcon name='time' size={20} color={pressed ? 'white' : ''} />
                  <Text style={{color: pressed ? 'white' : '', paddingTop: 1}}>
                    {month ? `${month} / ${year}` : 'Pilih rentang waktu'}
                  </Text>
                </>
              )}
            </Pressable>

            <View>
              <Text style={[styles.textDarkGray, styles.textLarge]}>
                <TabBarIcon name={'wallet'} style={styles.iconWallet} />
                {totalCashFilter ? cashFormated(totalCashFilter) : '0'}
              </Text>
            </View>
          </View>
        : null }

        <Modal isVisible={isModalMonthVisible}>
          <View style={styles.modalContainer}>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginHorizontal: 'auto', marginBottom: 12 }}>
              <Pressable onPress={() => setYear(year - 1)}>
                <TabBarIcon name='chevron-back' />
              </Pressable>
              <Text style={{ fontSize: 20, width: 60, textAlign: 'center' }}>{year}</Text>
              <Pressable onPress={() => setYear(year + 1)}>
                <TabBarIcon name='chevron-forward' />
              </Pressable>
            </View>
            
            <View style={styles.monthOptionContainer}>
              <MonthOption name='Jan' isActive={month === '1' ? true : false} onPress={() => month === '1' ? setMonth('') : setMonth('1')} />
              <MonthOption name='Feb' isActive={month === '2' ? true : false} onPress={() => month === '2' ? setMonth('') : setMonth('2')} />
              <MonthOption name='Mar' isActive={month === '3' ? true : false} onPress={() => month === '3' ? setMonth('') : setMonth('3')} />
            </View>

            <View style={styles.monthOptionContainer}>
              <MonthOption name='Apr' isActive={month === '4' ? true : false} onPress={() => month === '4' ? setMonth('') : setMonth('4')} />
              <MonthOption name='Mei' isActive={month === '5' ? true : false} onPress={() => month === '5' ? setMonth('') : setMonth('5')} />
              <MonthOption name='Jun' isActive={month === '6' ? true : false} onPress={() => month === '6' ? setMonth('') : setMonth('6')} />
            </View>

            <View style={styles.monthOptionContainer}>
              <MonthOption name='Jul' isActive={month === '7' ? true : false} onPress={() => month === '7' ? setMonth('') : setMonth('7')} />
              <MonthOption name='Aug' isActive={month === '8' ? true : false} onPress={() => month === '8' ? setMonth('') : setMonth('8')} />
              <MonthOption name='Sep' isActive={month === '9' ? true : false} onPress={() => month === '9' ? setMonth('') : setMonth('9')} />
            </View>

            <View style={styles.monthOptionContainer}>
              <MonthOption name='Okt' isActive={month === '10' ? true : false} onPress={() => month === '10' ? setMonth('') : setMonth('10')} />
              <MonthOption name='Nov' isActive={month === '11' ? true : false} onPress={() => month === '11' ? setMonth('') : setMonth('11')} />
              <MonthOption name='Des' isActive={month === '12' ? true : false} onPress={() => month === '12' ? setMonth('') : setMonth('12')} />
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
              <Pressable onPress={() => setIsModalMonthVisible(false)} style={{backgroundColor: '#6b6b6b', borderRadius: 4, paddingVertical: 6, paddingHorizontal: 8}}>
                <Text style={{color: 'white'}}>Kembali</Text>
              </Pressable>

              <Pressable onPress={handleSetMonthButton} style={{backgroundColor: '#1bb55b', borderRadius: 4, paddingVertical: 6, paddingHorizontal: 8}}>
                <Text style={{color: 'white'}}>Sesuaikan</Text>
              </Pressable>

            </View>

          </View>
        </Modal>


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
  optionFilter: {
    marginVertical: 4,
    marginEnd: 'auto',
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 4
  },
  bgBase: {
    borderColor: '#6b6b6b',
  },
  bgSelected: {
    borderColor: '#4678e3',
    backgroundColor: '#4678e3',
  },
  optionCashRounded: {
    borderColor: '#6b6b6b',
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 6,
  },
  optionCashRoundedSelected: {
    borderColor: '#4678e3',
    backgroundColor: '#4678e3',
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 6,
  },
  monthOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginHorizontal: 'auto',
    marginBottom: 10,
  },
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