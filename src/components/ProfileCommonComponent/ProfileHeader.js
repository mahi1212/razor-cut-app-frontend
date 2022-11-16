import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../../theme/spacing";
import Text from "../text/text";

export default function ProfileHeader({ backBtn, title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {backBtn && (
        <Pressable
          style={{ marginRight: 15 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      )}
      <Text preset="title">{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    
    marginBottom: spacing[7],
    
    marginTop: spacing[7],
    
    flexDirection: "row",
    
    display: "flex",
    
    alignItems: "center",
    
    padding:spacing[2],
    
    borderBottomColor: "orange",
    borderBottomWidth: 1,  },
});
