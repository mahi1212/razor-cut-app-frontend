import React from "react";
import { View, StyleSheet, Pressable, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../../theme/spacing";
import Text from "../Text/Text";
import { useContext } from "react";
import themeContext from "../../config/themeContext";

export default function ProfileHeader({ backBtn, title }) {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  return (
   
   <View style={styles.container}>
   
      {backBtn && (
   
        <Pressable
   
          style={{ padding:spacing[5]}}
   
          onPress={() => {
   
            navigation.goBack();
   
          }}
   
        >
          <AntDesign name="arrowleft" size={24} style={{color:theme.iconcolors}} />
          <Text preset="title" style={{marginTop:-21,marginLeft:spacing[10],color:theme.color }}>{title}</Text>

        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[7],
    flexDirection: "row",
    
    display: "flex",
    
    alignItems: "center",
    padding:spacing[1],  
    borderBottomColor: "orange",
    borderBottomWidth: 1,  },
});
