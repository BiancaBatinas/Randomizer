import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  return (
    
      <TextInput {...props} style={{...styles.inputContainer, ...props.style}} placeholder="Write a number" />
    
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 30,
    borderBottomWidth:1,
    borderBottomColor: 'grey',
    marginVertical: 10,
  },
});
export default Input;
