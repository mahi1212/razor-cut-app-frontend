import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import i18n from "i18n-js";
import {
  en,
  sp,
  bn,
} from "../../components/ProfileCommonComponent/localizations";

import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Button from "../../components/Button";

export default function EditProfile({ title, backBtn }) {
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };

  //update
  const { handleSubmit, control, reset } = useForm();

   const onSubmit = (data) => {
     console.log(data);
     axios.put("http://192.168.0.106:5000/updateUser", data)
     .then((res) => {
       if (res.data.insertedId) {
         alert("Profile updated successfully");
         reset();
       }
     });
   };


   
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: spacing[2] }}>
        <ProfileHeader backBtn={true} title={i18n.t("EditProfile")} />

        <View>
          <View style={styles.detailsView}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textSection}
                  onBlur={onBlur}
                  placeholder="Enter Your Name"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="name"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.detailsView}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textSection}
                  onBlur={onBlur}
                  placeholder="Enter Your Email"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.detailsView}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textSection}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  placeholder="Enter Your Number"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="number"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.button}>
            <Button
              style={styles.buttonInner}
              color
              title="Reset"
              onPress={() => {
                reset({
                  name: "",
                  email: "",
                  number: "",
                });
              }}
            />
          </View>

          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <Button onPress={handleSubmit(onSubmit)} title="Update" />
          </View>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
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
