import React, { useState, useMemo } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View } from "react-native";
import Text from "./Text/Text";
import Button from "./Button";

export default function DatePick({...params}) {

 const [selectedDate, setSelectedDate] = useState(new Date());
 const [datePickerVisible, setDatePickerVisible] = useState(false);

 const showDatePicker = () => {
   setDatePickerVisible(true);
 };

 const hideDatePicker = () => {
   setDatePickerVisible(false);
 };

 const handleConfirm = (date) => {
   setSelectedDate(date);
   hideDatePicker();
 };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {selectedDate ? selectedDate.toLocaleDateString() : "No date selected"}
      </Text>
      <Button title="Select Date" onPress={showDatePicker} />
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}


