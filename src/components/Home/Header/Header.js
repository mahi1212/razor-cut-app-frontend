import { View, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../Text/Text";
import { typography } from "../../../theme/typography";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../navigation";
import axios from "axios";
import { useContext } from "react";
import themeContext from "../../../config/themeContext";
export default function Header({ cart }) {
  const { container, logo, logoContainer, greetings, wave } = styles;
  // getting day or night in user local time
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 18;
  const navigation = useNavigation();
  // get user name
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("user is signed in");
        setUser(user);
        setEmail(user.email);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);
  const getUser = () => {
    axios.get(`http://172.20.10.2:5000/users/${email}`)
      .then((res) => {
        // console.log(res.data);
        setPhotoUrl(res.data.photoUrl);
        setName(res.data.name);
      });
  };
  getUser();
  // console.log(user);
  const userName = name || "User";
  // sign out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //modes
  const theme=useContext(themeContext)

  return (
    <View>
      <View style={container}>
        <View style={logoContainer}>
          {photoUrl ? <Image
            // source={require("../../../../assets/images/logo.png")}
            source={{
              uri: `${photoUrl}`
            }}
            style={logo}
          /> : 
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={logo}
          />}
          <Text preset="catagory" style={{color:theme.color, fontFamily: typography.bold, marginLeft: 10 }}>
            RazorCut
          </Text>
        </View>
        {/* logout & bookmark icon */}
        <View style={[styles.iconContainer,{color:theme.iconcolors}]}>
          <Pressable
            onPress={() => {
              //   console.log("pressed in notification");
              handleSignOut();
            }}
          >
            <MaterialIcons name="logout" size={24}color={theme.iconcolors} />
          </Pressable>
          <Pressable
            onPress={() => {
              // console.log("pressed in bookmarks")
              navigation.navigate("Bookmark", { cart: cart });
            }}
            style={{ marginLeft: 10 }}
          >
            <Ionicons name="bookmark-outline" size={24} color={theme.iconcolors} />
          </Pressable>
        </View>
      </View>
      <View style={greetings}>
        {isDayTime ? (
          <Text preset="h1"style={{color:theme.color}}>Morning, </Text>
        ) : (
          <Text preset="h1"style={{color:theme.color}}>Evening, </Text>
        )}
        <Text preset="h1"style={{color:theme.color}}>{userName}</Text>
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
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: '50%',
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
