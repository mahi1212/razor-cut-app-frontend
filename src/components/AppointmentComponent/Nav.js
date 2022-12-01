import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import Text from "../Text/Text";
import { spacing } from "../../theme/spacing";

export default function Nav({ title, onPress }) {
  
  return (
    
    <Pressable onPress={onPress} style={styles.liststyle}>
        <Text style={styles.titleS}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  liststyle: {
        borderRadius: 50,
        margin: spacing[3],
        alignSelf: "center",
        borderColor: "#FB9400",
        borderWidth: 2,
      
  },
  titleS: {
    padding:8,
    fontSize: 20,
    color:colors.orange
  },
});
