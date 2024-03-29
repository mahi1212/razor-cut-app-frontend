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
import axios from "axios";
import Button from "../../components/Button";
import { useState } from "react";
import Text from "../../components/Text/Text";
import { useRef } from "react";
import { auth } from "../../../navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import themeContext from "../../config/themeContext";
import theme from "../../config/theme";
export default function EditProfile() {
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [phone, setPhone] = useState('')
  //reset state
  const resetState = () => {
    setName('');
    setPhotoUrl('');
    setPhone('');
  }
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  function clearTextInputs() {
    // cleat text input
    input1Ref.current.clear();
    input2Ref.current.clear();
    input3Ref.current.clear();
    // reset state
    resetState();
  }
  // get user email
  const [email, setEmail] = useState(null);
  // console.log(email);
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
      phone
    }
    console.log(data);
    if (name == '' || photoUrl == '' || phone == '') {
      return alert('Please fill all the fields')
    }
    // put request
    console.log(user.email);
    axios.put(`http://172.20.10.2:5000/users/${email}`, data)
      .then((res) => {
        if (res.data) {
          alert("Profile updated successfully");
          resetState();
        }
      });
  }
  const theme = useContext(themeContext);

  // main function
  return (
    <SafeAreaView  style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={{ padding: spacing[2] }}>
        <ProfileHeader backBtn={true} title={i18n.t("EditProfile")} />
        <View>
          <View style={styles.detailsView}>
            <Text preset="title" style={{color:theme.color}}>Name : </Text>
            <TextInput
              ref={input1Ref}
              style={[styles.textSection,{color:theme.color}]}
              placeholder="Update Your Name"
              onChangeText={(text) => setName(text)}
              placeholderTextColor={colors.gray}
            />
          </View>
          {/* image url upload */}
          <View style={styles.detailsView}>
            <View style={{ flexDirection: "row" }}>
              <Text preset="title"style={{color:theme.color}}>Image URL :</Text>
              <Pressable onPress={() => Linking.openURL("https://imgbb.com/")} style={{ marginLeft: 10 }} >
                <Text preset="title">GET LINK FROM HERE</Text>
              </Pressable>
            </View>
            <TextInput
              ref={input2Ref}
              style={[styles.textSection,{color:theme.color}]}
              placeholder="Update Your Image"
              onChangeText={(text) => setPhotoUrl(text)}
              placeholderTextColor={colors.gray}

            />
          </View>
          {/* phone number update */}
          <View style={styles.detailsView}>
            <Text preset="title"style={{color:theme.color}}>Phone : </Text>
            <TextInput
              ref={input3Ref}
              style={[styles.textSection,{color:theme.color}]}
              placeholder="Update Your Number"
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={colors.gray}

            />
          </View>

          <View style={{ marginTop: 20 }}>
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
  container:{
    flex:1
  }

});
