import React, { useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePick = ({...props}) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (time) => {
    setSelectedTime(time);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          {selectedTime
            ? selectedTime.toLocaleTimeString()
            : "No Time selected"}
            
        </Text>
        <Button title="Select Time" onPress={showDatePicker} />
        <DateTimePickerModal
        time={selectedTime}
          isVisible={datePickerVisible}
          mode="time"
          is24Hour
          locale="en_GB"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </SafeAreaView>
  );
};

export default TimePick;
