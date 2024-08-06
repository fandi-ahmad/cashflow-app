import { Pressable, StyleSheet, Text, View, PressableProps } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface checkboxProps extends PressableProps {
  isChecked: boolean
  title?: string
  color?: string
  // onPress?: (text: string) => void
}

const CheckBox = (props: checkboxProps) => {
  const iconName = props.isChecked ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <Pressable style={styles.container} {...props}>
      <View>
        <MaterialCommunityIcons name={iconName} size={24} color={props.isChecked ? '#4678e3' : ''} />
      </View>
      { props.title ? <Text style={styles.title}>{props.title}</Text> : null }
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
    marginRight: 'auto',
  },
  title: {
    fontSize: 16,
    marginLeft: 5,
  },
});