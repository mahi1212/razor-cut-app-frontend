import React from "react";
import {
  Linking,
  Pressable,
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
import { useState } from "react";
import Text from "../../components/Text/Text";
import { useRef } from "react";
import { auth } from "../../../navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function EditProfile({ title, backBtn }) {
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [number, setNumber] = useState('')
  //reset state
  const resetState = () => {
    setName('');
    setPhotoUrl('');
    setNumber('');
  }
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  function clearTextInputs() {
    input1Ref.current.clear();
    input2Ref.current.clear();
    input3Ref.current.clear();
    resetState();
  }
  // get user email
  const [email, setEmail] = useState(null);
  console.log(email);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handleSubmit = () => {
    const data = {
      name,
      photoUrl,
      number
    }
    console.log(data);
    if (name == '' || photoUrl == '' || number == '') {
      alert('Please fill all the fields')
    }
    // put request
    console.log(user.email);
    axios.put(`http://192.168.0.221:5000/users/${email}`, data)
      .then((res) => {
        if (res.data) {
          alert("Profile updated successfully");
          resetState();
        }
      });
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: spacing[2] }}>
        <ProfileHeader backBtn={true} title={i18n.t("EditProfile")} />
        <View>
          <View style={styles.detailsView}>
            <Text preset="title">Name : </Text>
            <TextInput
              ref={input1Ref}
              style={styles.textSection}
              placeholder="Update Your Name"
              onChangeText={(text) => setName(text)}
            />
          </View>
          {/* image url upload */}
          <View style={styles.detailsView}>
            <View style={{ flexDirection: "row" }}>
              <Text preset="title">Image URL :</Text>
              <Pressable onPress={() => Linking.openURL("https://imgbb.com/")} style={{ marginLeft: 10 }} >
                <Text preset="title">GET LINK FROM HERE</Text>
              </Pressable>
            </View>
            <TextInput
              ref={input2Ref}
              style={styles.textSection}
              placeholder="Update Your Image"
              onChangeText={(text) => setPhotoUrl(text)}
            />
          </View>
          {/* phone number update */}
          <View style={styles.detailsView}>
            <Text preset="title">Phone : </Text>
            <TextInput
              ref={input3Ref}
              style={styles.textSection}
              placeholder="Update Your Number"
              onChangeText={(text) => setNumber(text)}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Button
              title="Clear"
              onPress={clearTextInputs}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Button onPress={handleSubmit} title="Update" />
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
