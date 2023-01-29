import { View, Image, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../../theme/spacing";
import Lists from "../../components/ProfileCommonComponent/Lists";
import { colors } from "../../theme/colors";
import Text from "../../components/Text/Text";

import i18n from "i18n-js";
import {
  en,
  sp,
  bn,
} from "../../components/ProfileCommonComponent/localizations";

import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Button from "../../components/Button";
import I18n from "i18n-js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../navigation";
import axios from "axios";

export default function Profile({ navigation }) {
  //navigate to edit page
  const onPressEdit = () => {
    navigation.navigate("Edit");
  };

  const onPressAppointment = () => {
    navigation.navigate("Appointment");
  };

  const onPressLng = () => {
    navigation.navigate("Language");
  };

  const onPressPrivacy = () => {
    navigation.navigate("Privacy");
  };

  //icons
  function Icon({ fontFamily, name, colors }) {
    if (fontFamily === "AntDesign") {
      return <AntDesign name={name} size={24} color={colors} />;
    } else if (fontFamily === "MaterialCommunityIcons") {
      return <MaterialCommunityIcons name={name} size={24} color={colors} />;
    } else if (fontFamily === "Ionicons") {
      return (
        <Ionicons
          name={name}
          size={24}
          color={colors}
          style={{ display: "flex" }}
        />
      );
    } else if (fontFamily === "MaterialIcons") {
      return <MaterialIcons name={name} size={24} color={colors} />;
    } else if (fontFamily === "FontAwsome") {
      return <FontAwesome name={name} size={24} color={colors} />;
    }
  }

  // Language change
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };

  // get user email
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  console.log(photoUrl);
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

  const getUser = () => {
    axios.get(`http://192.168.0.221:5000/users/${email}`)
      .then((res) => {
        // console.log(res.data);
        setPhotoUrl(res.data.photoUrl);
        setNumber(res.data.phone)
        setName(res.data.name);
      });
  };
  getUser();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);

  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: spacing[3] }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getUser} />
      }>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <Text style={{ fontSize: 24 }}>{I18n.t("Profile")} </Text> */}
        </View>

        {/* header section done */}
        {user && <View style={styles.profilesection}>
          <View>
            {photoUrl && <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                resizeMode: "contain",
                margin: spacing[4],
              }}
              source={{
                uri: `${photoUrl}`
              }}
            />}
          </View>
          <View style={styles.Info}>
            <Text preset="title" style={{ marginBottom: spacing[4] }}>
              Name: {name}
            </Text>
            <Text preset="h2" style={{ marginBottom: spacing[4] }}>
              Email: {email}
            </Text>
            <Text preset="h2" style={{ marginBottom: spacing[4] }}>
              { number && `Number: ${number}`}
            </Text>
          </View>
        </View>}

        {/* 3rd section of  Profile */}

        {/* edit profile */}
        <View style={styles.field}>
          <Icon
            fontFamily={"MaterialCommunityIcons"}
            name="account"
            color={colors}
          />
          <Lists title={i18n.t("EditProfile")} onPress={() => onPressEdit()} />
        </View>

        {/* Appointemnt section */}
        <View style={styles.field}>
          <Icon
            fontFamily={"MaterialCommunityIcons"}
            name="account"
            color={colors}
          />
          <Lists title={i18n.t("Appointment")} onPress={() => onPressAppointment()} />
        </View>
        {/* language */}
        <View style={styles.field}>
          <Icon fontFamily={"FontAwsome"} name="language" color={colors} />
          <Lists title={i18n.t("header")} onPress={() => onPressLng()} />
        </View>

        {/* privacy */}
        <View style={styles.field}>
          <Icon
            fontFamily={"MaterialIcons"}
            name="privacy-tip"
            color={colors}
          />
          <Lists title={i18n.t("Privacy")} onPress={() => onPressPrivacy()} />
        </View>
      </ScrollView>
      <StatusBar style="auto" />

      {/* logout button */}
      {/* <Button title="Signout" onClick={logOut} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profilesection: {

    alignItems: "center",

    justifyContent: "center",

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,

    marginBottom: spacing[6],
  },
  field: {
    marginBottom: spacing[4],
    padding: spacing[3],
  },
  Info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#EEEEEE',
    width: '100%',
    padding: spacing[3],
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
