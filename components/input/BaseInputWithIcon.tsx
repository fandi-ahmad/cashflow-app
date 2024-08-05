import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native"

interface InputProps extends TextInputProps {
  label?: string;
  icon?: string;
  styleAdd?: any
}

const BaseInputWithIcon = (props: InputProps) => {
  return (
    <>
      { props.label ? <Text style={{paddingBottom: 4}}>{props.label}</Text> : null }

      <View style={styles.inputConteiner}>

        <View style={styles.iconField}>
          <Text style={{margin: 'auto', color: 'white'}}>{props.icon}</Text>
        </View>

        <TextInput
          style={[styles.inputField, props.styleAdd]}
          placeholderTextColor='#b5b5b5'
          {...props}
        />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  inputConteiner: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    width: '100%'
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#888888',
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
    padding: 8,
    marginBottom: 20,
    width: '100%',
  },
  iconField: {
    marginBottom: 20,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: '#888888',
    borderTopStartRadius: 4,
    borderBottomStartRadius: 4,
  }
})

export default BaseInputWithIcon