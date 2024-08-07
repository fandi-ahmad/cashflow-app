import { Pressable, Text, StyleSheet, PressableProps } from "react-native"

interface MonthOptionProps extends PressableProps {
  name: string
  isActive?: boolean
}

const MonthOption = (props: MonthOptionProps) => {
  return (
    <Pressable style={props.isActive ? styles.optionRoundedSelected : styles.optionRounded} {...props}>
      <Text style={{marginHorizontal: 'auto', color: props.isActive ? 'white' : ''}}>
        {props.name}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  optionRounded: {
    borderColor: '#6b6b6b',
    borderWidth: 1.5,
    borderRadius: 40,
    paddingVertical: 6,
    width: 60,
  },
  optionRoundedSelected: {
    borderColor: '#4678e3',
    backgroundColor: '#4678e3',
    borderWidth: 1.5,
    borderRadius: 40,
    paddingVertical: 6,
    width: 60,
  },
})

export default MonthOption