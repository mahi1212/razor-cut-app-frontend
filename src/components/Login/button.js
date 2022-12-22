import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";

export default function Button({ title, onPress, customStyles }) {
  return (
    <Pressable style={customStyles} onPress={onPress}>
      <Text style={{ color: "white",  textAlign: "center" }}>
        {title}
      </Text>
    </Pressable>
  );
}
