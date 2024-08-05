import { Text, TextInput, StyleSheet, TextInputProps } from "react-native"

interface inputProps extends TextInputProps {
  label?: string
  styleAdd?: any
}

const BaseInput = (props: inputProps) => {
  return (
    <>
    
      { props.label ? <Text style={{paddingBottom: 4}}>{props.label}</Text> : null }

      <TextInput
        style={[styles.inputField, props.styleAdd]}
        placeholderTextColor='#b5b5b5'
        {... props}
      />

    </>
  )
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 4,
    padding: 8,
    marginBottom: 20
  }
})
export default BaseInput