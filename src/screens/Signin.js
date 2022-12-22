import { View, TextInput, Pressable, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { spacing } from "../theme/spacing";
import Text from "../components/Text/Text";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import OrText from "../components/Login/OrText";
import GoogleButton from "../components/Login/GoogleButton";

export default function Signin() {
  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle login function

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log("signin successfully", res);
    });
  };

  return (
    <View style={{ marginHorizontal: 20, flex: 1 }}>
      {/* title */}
      <View>
        <Text style={styles.title1}>Login to Your</Text>
        <Text style={styles.title2}>Account</Text>
      </View>
      <View style={{ marginTop: 60 }}>
        <TextInput
          placeholder="Email"
          style={{
            marginBottom: 15,
            backgroundColor: "#F5F5F5",
            padding: 20,
            borderRadius: 10,
            color: "#ccc",
          }}
        />
        <TextInput
          placeholder="Password"
          style={{
            marginBottom: 15,
            backgroundColor: "#F5F5F5",
            padding: 20,
            borderRadius: 10,
          }}
          secureTextEntry={true}
        />
        {/* forgot password */}
        <Pressable
          onPress={() => {
            console.log("Forgot Password Clicked");
          }}
          style={{ marginLeft: 10 }}
        >
          <Text>Forgot Password?</Text>
        </Pressable>
        {/* login button */}
        <Pressable
          onPress={() => {
            console.log("Login Clicked");
          }}
          style={{
            backgroundColor: colors.darkOrange,
            padding: 15,
            marginHorizontal: 5,
            borderRadius: 30,
            marginVertical: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Sing In
          </Text>
        </Pressable>
        {/* Or text */}
        <OrText />
        {/* google sign in */}
        <GoogleButton title="in"/>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 50 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            Don't have an account?
            <Pressable
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.signuptext}>Sign up</Text>
            </Pressable>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title1: {
    marginTop: "25%",
    fontSize: 38,
    alignSelf: "flex-start",
    fontWeight: "700",
  },
  title2: {
    fontSize: 38,
    alignSelf: "flex-start",
    fontWeight: "700",
  },
  checkbox: {
    alignSelf: "center",
    marginRight: "40%",
    marginBottom: "5%",
    marginTop: 0,
  },
  checkboxtext: {
    marginTop: "-10%",
    alignSelf: "center",
  },
  oneTapSignIn: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  signuptext: {
    color: "#FB9400",
    fontWeight: "bold",
    marginLeft: "6%",
    marginBottom: -2,
  },
});
