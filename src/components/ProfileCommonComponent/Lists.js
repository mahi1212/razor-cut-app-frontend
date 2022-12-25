import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import Text from "../Text/Text";
;



export default function Lists({ title, onPress }) {
  
  return (
    
    <Pressable onPress={onPress} style={styles.liststyle}>
    
      <Text style={{ fontSize: 16,padding:spacing[2] }}>{title}</Text>
    
      <AntDesign name="right" size={24} color={colors.gray}/>
    
    </Pressable>
  );
}

const styles = StyleSheet.create({
  liststyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:"-10%",
    marginLeft:30,
  },
});
