import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { SPECIALIST_LIST } from "./SpecialistList";
import { spacing } from "../../../theme/spacing";
import { colors } from "../../../theme/colors";

export default function Specialist() {
  return (
    <FlatList
      data={SPECIALIST_LIST}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.list}>
            <View style={styles.specialistimg}>
              <Image  source={{uri:item.image}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 10,
                  padding: spacing[5],
                }}
              ></Image>
            </View>
            <Text style={{marginTop:10}}>{item.name}</Text>
            <Text style={{marginTop:5,color:colors.gray}}>{item.position}</Text>
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
    padding: spacing[5],
  },
  catagory: {
    paddingVertical: spacing[2],
  },
});
