import { View, Text, StyleSheet } from "react-native"
import { TabBarIcon } from "../navigation/TabBarIcon"
import { cashFormated, limitText } from "@/function"

interface cardListProps {
  type: string,
  amount: number,
  created_at: string,
  note?: string,
}

const CardList = (props: cardListProps) => {
  return (
    <View style={styles.borderCard}>

      {/* note & date */}
      <View>
        <Text>{limitText(25, props.note || '')}</Text>
        <Text style={[styles.textSmall, styles.textGray]}>
          {props.created_at}
        </Text>
      </View>

      <View style={styles.cashflowCount}>
        <Text style={[styles.textMedium, props.type === 'income' ? styles.textGreen : styles.textRed]}>
          {/* amount value */}
          {cashFormated(props.amount)}
        </Text>

        <TabBarIcon
          name={props.type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle'}
          style={[styles.textMedium, props.type === 'income' ? styles.textGreen : styles.textRed]}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
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
  cashflowCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  textMedium: {
    fontSize: 16,
    fontWeight: 500,
  },
  textSmall: {
    fontSize: 10
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
})

export default CardList