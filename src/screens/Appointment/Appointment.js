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


export default function Appointment() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  //date
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  console.log(name, phone, selectedStartDate)

  const startDate = selectedStartDate
    ? selectedStartDate.format("DD-MM-YYYY").toString()
    : "No date selected";

  //submit
  const onSubmit = (data) => {
    console.log(data);

    axios.post("http://192.168.0.106:5000/appointment", data).then((res) => {
      if (res.data.insertedId) {
        alert("Appointment Booked Successfully");
      }
    });
  };

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
        <TextInput style={styles.textSection}>date={startDate}</TextInput>
      </View>

      {/* Time */}
      <View style={{ marginTop: spacing[3] }}>
        <Controller
          control={control}
          render={({ field }) => <TimePick {...field} />}
          name="time"
          rules={{ required: true }}
        />
        
      </View>

      <Button onPress={handleSubmit(onSubmit)} title="Continue" />
    </ScrollView>
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
});
