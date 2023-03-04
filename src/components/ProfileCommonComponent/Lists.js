import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import Text from "../Text/Text";
import theme from "../../config/theme";
import themeContext from "../../config/themeContext";
import { useContext } from "react";
;



export default function Lists({ title, onPress }) {
  const theme = useContext(themeContext);
  return (
    
    <Pressable onPress={onPress} style={styles.liststyle}>
    
      <Text style={[styles.textStyle,{color:theme.color}]}>{title}</Text>
    
      <AntDesign name="right" style={{ padding:spacing[3]}}
         size={22} color={colors.gray}/>
    
    </Pressable>
  );
}
const styles = StyleSheet.create({
  liststyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:"-13%",
    marginLeft:spacing[8],
    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
  },
  textStyle: {fontSize:16,
  padding:spacing[3]}
});
