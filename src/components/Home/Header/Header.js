import { View, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../Text/Text";
import { typography } from "../../../theme/typography";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../navigation";
import { signOut } from "firebase/auth";

export default function Header({ cart }) {
  const { container, logo, logoContainer, greetings, wave } = styles;
  // getting day or night in user local time
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 18;
  const navigation = useNavigation();
  const name = "Mahinur";
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <View style={container}>
        <View style={logoContainer}>
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={logo}
          />
          <Text preset="catagory" style={{ fontFamily: typography.bold }}>
            RazorCut
          </Text>
        </View>
        {/* notification & bookmark icon */}
        <View style={styles.iconContainer}>
          <Pressable
            onPress={() => {
            //   console.log("pressed in notification");
            handleSignOut();
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => {
              // console.log("pressed in bookmarks")
              navigation.navigate("Bookmark", { cart: cart });
            }}
            style={{ marginLeft: 10 }}
          >
            <Ionicons name="bookmark-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={greetings}>
        {isDayTime ? (
          <Text preset="h1">Morning, </Text>
        ) : (
          <Text preset="h1">Evening, </Text>
        )}
        <Text preset="h1">{name}</Text>
        <Image
          source={require("../../../../assets/images/so-so.png")}
          style={wave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  greetings: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  wave: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
});
