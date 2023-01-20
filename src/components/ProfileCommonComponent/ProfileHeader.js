import React from "react";
import { View, StyleSheet, Pressable, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../../theme/spacing";
import Text from "../Text/Text";

export default function ProfileHeader({ backBtn, title }) {
  
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
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text preset="title" style={{marginTop:-26,marginLeft:spacing[10] }}>{title}</Text>

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
