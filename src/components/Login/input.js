import { StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

export default function Input({
  placeholder,
  multiline,
  numberOfLines,
  secureTextEntry = false,
  onChangeText,
  autoCapitalize,
  value,
  title
}) {

// const customOnFocus = () =>{
//   props?onFocus:
//   setbgColor(secondary)
// }

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCorrect={false}
      value={value}
      autoCapitalize={autoCapitalize}
      numberOfLines={numberOfLines}
      multiline={multiline}
      // background={bgColor}
      title={title}
     
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 10,
  }
});
