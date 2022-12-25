import { View, Text } from "react-native";
import React from "react";

export default function OrText() {
  return (
    <View>
      <View style={{ height: 1, backgroundColor: "#ccc", marginTop: 20 }} />
      <Text
        style={{
          backgroundColor: "#fff",
          alignSelf: "center",
          paddingHorizontal: 10,
          color: "#ccc",
          fontSize: 16,
          position: "absolute",
          bottom: -7,
        }}
      >
        or
      </Text>
    </View>
  );
}
