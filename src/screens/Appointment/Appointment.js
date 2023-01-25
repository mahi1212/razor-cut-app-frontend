import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TextInputBase,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import axios from "axios";
import { useState } from "react";
import Button from "../../components/Button";
import CalendarPicker from "react-native-calendar-picker";
import Text from "../../components/Text/Text";
import TimePick from "../../components/TimePick";

import i18n from "i18n-js";
import {
  en,
  sp,
  bn,
} from "../../components/ProfileCommonComponent/localizations";
import Checkbox from "expo-checkbox";
import TimeSelect from "./TimeSelect";


export default function Appointment() {
  const [isSelected, setSelection] = useState('');
  console.log(isSelected)
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  console.log(name, phone, selectedStartDate)
  const data = {
    name: name,
    phone: phone,
    date: selectedStartDate ? selectedStartDate.format("DD-MM-YYYY").toString()
      : "No date selected"
  }
  const startDate = selectedStartDate
    ? selectedStartDate.format("DD-MM-YYYY").toString()
    : "No date selected";

  //submit
  const onSubmit = () => {
    console.log(data);
    if (!name || !phone || !selectedStartDate) {
      alert('Please fill all the fields')
    } else {
      axios.post("http://192.168.0.221:5000/appointment", data).then((res) => {
        if (res.data.insertedId) {
          alert("Appointment Booked Successfully");
        }
      });
    }

  };
  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'] 
  //language
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };

  return (
    <ScrollView style={styles.detailsView}>
      <ProfileHeader backBtn={true} title={i18n.t("Appointment")} />
      {/* name */}
      <View>
        <Text preset="h6">Name</Text>
        <TextInput
          style={styles.textSection}
          placeholder="Enter Your Name"
          onChangeText={(text) => setName(text)}
        />
      </View>
      {/* phone number */}
      <View style={{ marginTop: spacing[3] }}>
        <Text preset="h6">Phone Number</Text>
        <TextInput
          style={styles.textSection}
          placeholder="Enter Phone Number"
          onChangeText={(text) => setPhone(text)}
        // keyboardType="numeric"
        />
      </View>
      {/* Dates */}
      <View style={{ marginTop: spacing[3] }}>
        <CalendarPicker onDateChange={(date) => setSelectedStartDate(date)} />
        <TextInput editable={false} style={styles.textSection}>Date selected : {startDate}</TextInput>
      </View>

      {/* Time */}
      {/* <View style={{ marginTop: spacing[3] }}>
        <TimePick />
      </View> */}
      {/* time in checkbox */}
      <TimeSelect />
      <View style={{ marginTop: spacing[3] }}>
        <Text preset="h6">Select Time</Text>
    </View>
      {/* {
        times.map((time, index) => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: spacing[3] }}>
              <Text onPress={() => setSelection(time)} preset="h6">{time}</Text>
            </View>
          )
        })
      } */}
      <Button onPress={onSubmit} title="Continue" />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  detailsView: {
    padding: spacing[3],
  },
  textSection: {
    marginVertical: spacing[3],
    paddingVertical: spacing[3],
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
  },
  checkbox: {
    alignSelf: "center",
  },
});
