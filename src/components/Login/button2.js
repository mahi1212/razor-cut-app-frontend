import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function Button2({ title, onPress, customStyles }) {
  return (
    <View>
      <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 55,
    backgroundColor: "FFFFFF",
    justifyContent: "center",
    borderColor: "grey",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    color: "black",
    fontSize: 20,
    alignSelf: "center",
   },
});