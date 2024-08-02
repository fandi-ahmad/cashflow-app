import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabBarIcon } from './navigation/TabBarIcon';
import { useGlobalState } from '@/hooks/useGlobalState';

export function HeroSection() {
  const [totalCash, setTotalCash] = useGlobalState('totalCash')
  const [totalCashFormated, setTotalCashFormated] = useGlobalState('totalCashFormated')

  const cashFomat = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getTotalCash = () => {
    const formated = cashFomat(totalCash)
    setTotalCashFormated(formated)
  }

  useEffect(() => {
    getTotalCash()
  }, [totalCash])

  return (
    <View style={styles.heroSection}>
      <Text style={styles.textWhite}>Your current money</Text>
      <Text style={[styles.textWhite, styles.textLarge]}>
        <TabBarIcon name={'wallet'} style={styles.iconWallet} />
        {totalCashFormated}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#2f3dc2',
    padding: 20,
    paddingTop: 28
  },
  textWhite: {
    color: '#ffffff'
  },
  textLarge: {
    fontSize: 28,
    fontWeight: 700
  },
  iconWallet: {
    fontSize: 20,
    marginRight: 8
  },
})