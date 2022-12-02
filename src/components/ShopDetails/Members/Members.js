
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

export default function Members({ members }) {
  return (
    <FlatList
      data={members}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.list}>
            <View style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <Image source={{ uri: item.image }}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                }}
              />
            </View>
            <Text style={{ marginTop: 10 }}>{item.name}</Text>
            {/* <Text style={{ marginTop: 5, color: colors.gray }}>{item.position}</Text> */}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },
});