import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
import { Fontisto } from "@expo/vector-icons";
import Text from "./text/text";
export default function DatePick() {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  return (
    <View style={styles.inputField}>
      <Text>{date.toLocaleString()}</Text>
      <Fontisto
        name="date"
        size={24}
        color={colors.gray}
        onPress={showDatepicker}
      />
    </View>
  );
}
const styles = StyleSheet.create({

  inputField: {
    display: "flex",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginVertical: spacing[3],

    paddingVertical: spacing[3],

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
  },

  textSection: {
    marginVertical: spacing[3],

    paddingVertical: spacing[3],

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
  }
});
