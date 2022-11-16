import { View,StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Text from "../text/text";

export default function RadioInput({ label, value, setValue }) {
  const isSelected = value === label;

  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.container}>
        <Text style={{ marginLeft: 10 }}>{label}</Text>

        <View
          style={[styles.outerCircle, isSelected && styles.selectedOuterCirlce]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && styles.selectedInnerCirlce,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    justifyContent: "space-between",
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "orange",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#cfcfcf",
  },
  selectedOuterCirlce: {
    borderColor: "orange",
  },
  selectedInnerCirlce: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
