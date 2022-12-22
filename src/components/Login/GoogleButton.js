import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Text from "../Text/Text";

export default function GoogleButton({title}) {
  return (
    <View
      style={{
        marginTop: 35,
      }}
    >
      <Pressable onPress={() => login()} style={styles.oneTapSignIn}>
        <Text preset="catagory" style={{ marginEnd: 5 }}>
          Sign {title} with
        </Text>
        <AntDesign name="google" size={28} color="#4285F4" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  oneTapSignIn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },
});
