import { View, Image, StyleSheet, ScrollView, RefreshControl, Switch } from "react-native";
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
import { useContext } from "react";
import themeContext from "../../config/themeContext";
import theme from "../../config/theme";
import { EventRegister } from "react-native-event-listeners";

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
      return <AntDesign name={name} size={24} color={theme.iconcolors} />;
    } else if (fontFamily === "MaterialCommunityIcons") {
      return <MaterialCommunityIcons name={name} size={24} color={theme.iconcolors} />;
    } else if (fontFamily === "Ionicons") {
      return <Ionicons name={name} size={24} color={theme.iconcolors} style={{ display: "flex" }} />
    } else if (fontFamily === "MaterialIcons") {
      return <MaterialIcons name={name} size={24} color={theme.iconcolors} />;
    } else if (fontFamily === "FontAwsome") {
      return <FontAwesome name={name} size={24} color={theme.iconcolors} />;
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

  // logout
  const logOut = () => {
    auth.signOut();
  };
  const getUser = () => {
    axios.get(`http://192.168.68.228:5000/users/${email}`)
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
  //themes
  const [mode, setMode] = useState(false);

  ///colors
  const theme = useContext(themeContext);
  // main function
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView style={{ padding: spacing[3] }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getUser} />
      }>

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
          {/* text section */}
          <View style={styles.Info}>
            <Text preset="title" style={{ marginBottom: spacing[4] }}>
              Name: {name}
            </Text>
            <Text preset="h2" style={{ marginBottom: spacing[4] }}>
              Email: {email}
            </Text>
            <Text preset="h2" style={{ marginBottom: spacing[4] }}>
              {number && `Number: ${number}`}
            </Text>
          </View>
        </View>}

        {/* 3rd section of  Profile */}

        {/* edit profile */}
        <View style={styles.field}>
          <Icon
            fontFamily={"MaterialCommunityIcons"}
            name="account"
            color={theme.colors}
          />
          <Lists title={i18n.t("EditProfile")} onPress={() => onPressEdit()} />
        </View>
        {/* language */}
        <View style={styles.field}>
          <Icon fontFamily={"FontAwsome"} name="language" color={theme.iconcolors} />
          <Lists title={i18n.t("header")} onPress={() => onPressLng()} />
        </View>

        {/* privacy */}
        <View style={styles.field}>
          <Icon
            fontFamily={"MaterialIcons"}
            name="privacy-tip"
            color={theme.iconcolors}
          />
          <Lists title={i18n.t("Privacy")} onPress={() => onPressPrivacy()} />
        </View>
        {/* logout */}
        <View style={styles.field}>
          <Icon
            fontFamily={"MaterialIcons"}
            name="logout"
            color={theme.iconcolors}
          />
          <Lists title={"Logout"} onPress={() => logOut()} />
        </View>
        
        {/* Mode changes */}
        <View>
          <View style={styles.darkmodestyle}>
            <Text style={{ color: theme.color, fontSize: 18 }}>Dark Theme</Text>
            <Switch
              value={mode}
              onValueChange={(value) => {
                setMode(value);
                EventRegister.emit("changeTheme", value);
              }}
            ></Switch>
          </View>

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
  container: {
    padding: spacing[3],
    flex: 1,
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
  darkmodestyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "-3%",
    marginLeft: spacing[5],
  },
});
