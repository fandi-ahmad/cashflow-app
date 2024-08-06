import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TabBarIcon } from './navigation/TabBarIcon';
import { useGlobalState } from '@/hooks/useGlobalState';
import { cashFormated } from '@/function';

export function HeroSection() {
  const [totalCash, setTotalCash] = useGlobalState('totalCash')
  const [totalCashFormated, setTotalCashFormated] = useGlobalState('totalCashFormated')

  const getTotalCash = () => {
    const formated = cashFormated(totalCash)
    setTotalCashFormated(formated)
  }

  useEffect(() => {
    getTotalCash()
  }, [totalCash])

  return (
    <View style={styles.heroSection}>
      <Text style={styles.textWhite}>Uangmu sekarang</Text>
      <Text style={[styles.textWhite, styles.textLarge]}>
        <TabBarIcon name={'wallet'} style={styles.iconWallet} />
        {totalCash ? totalCashFormated : '0'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#2f3dc2',
    padding: 20,
    paddingTop: 48
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
    paddingRight: 8
  },
})