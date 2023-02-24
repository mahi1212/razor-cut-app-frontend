import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TextInputBase,
  KeyboardAvoidingView,
  Pressable,
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../../navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


export default function Appointment({ route }) {
  const [isSelected, setSelected] = useState('');
  console.log(isSelected)
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [userEmail, setUserEmail] = useState("");
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  const data = {
    shop_name: route?.params?.shop?.name,
    email: route?.params?.shop?.email,
    user_email: userEmail,
    user_name: name,
    phone: phone,
    date: selectedStartDate ? selectedStartDate.format("DD-MM-YYYY").toString()
      : "No date selected",
    time: isSelected,
    status: 'pending'
  }
  const startDate = selectedStartDate
    ? selectedStartDate.format("DD-MM-YYYY").toString()
    : "No date selected";

  //submit
  const onSubmit = () => {
    if (!name || !phone || !selectedStartDate) {
      alert('Please fill all the fields')
      return;
    }
    // if (data.shopEmail === '') {
    //   data.shopEmail = route?.params?.shop?.email
    // }
    axios.post("http://192.168.0.221:5000/appointment", data).then((res) => {
      if (res.data.insertedId) {
        alert("Appointment Booked Successfully");
      }
    });
    console.log(data);
  }
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM']
  //language
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };

  return (
    <ScrollView style={styles.detailsView}>
      <ProfileHeader backBtn={true} title={i18n.t("Appointment")} />
      {/* name */}
      <Text preset="h6" style={{ marginBottom: 20 }} >SELECTED SHOP EMAIL : {route?.params?.shop?.email}</Text>

      <View>
        <Text preset="h6">NAME</Text>
        <TextInput
          style={styles.textSection}
          placeholder="Enter Your Name"
          onChangeText={(text) => setName(text)}
        />
      </View>
      {/* phone number */}
      <View style={{ marginTop: spacing[3] }}>
        <Text preset="h6">PHONE NUMBER</Text>
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

      <View style={{ marginTop: spacing[3] }}>
        <Text preset="h6">SELECT TIME</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {times.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={isSelected === item ? styles.activeCatagoryButton : styles.catagoryButton}
              onPress={() => {
                setSelected(item)
              }}
            >
              <Text
                preset="title"
                style={isSelected === item ? styles.selectedItemText : styles.normalItemText}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

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
  selectedShop: {
    marginVertical: spacing[3],
    paddingVertical: spacing[3],
  },
  activeCatagoryButton: {
    width: 100,
    backgroundColor: colors.darkOrange,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: "50%",
    marginHorizontal: 3,
  },
  catagoryButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: "50%",
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.darkOrange,
  },
  selectedItemText: {
    color: colors.white,
  },
  normalItemText: {
    color: colors.orange,
  },
});
