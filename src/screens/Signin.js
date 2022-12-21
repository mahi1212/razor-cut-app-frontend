import { View, TextInput, Pressable, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { spacing } from "../theme/spacing";
import Text from "../components/Text/Text";
import { colors } from "../theme/colors";

export default function Signin({ navigation }) {
  const navigateToSignIn = () => {
    navigation.navigate("Signup");
  };

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
      {/* back buttom */}
      <View style={{ marginTop: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="gray" />
        </Pressable>
      </View>
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
        <Pressable onPress={
          () => {
            console.log("Forgot Password Clicked");
          }
        } style={{marginLeft: 10}}>
          <Text>Forgot Password?</Text>
        </Pressable>
        {/* login button */}
        <Pressable
          onPress={() => {
            console.log("Login Clicked");
          }}
        >
          <View
            style={{
              backgroundColor: colors.darkOrange,
              padding: 10,
              marginHorizontal: 5,
              borderRadius: 30,
              marginVertical: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
              Sing In
            </Text>
          </View>
        </Pressable>
        
        <View>
          <View style={{ height: 1, backgroundColor: "#ccc", marginTop: 30 }} />
          <Text
            style={{
              backgroundColor: "#fff",
              alignSelf: "center",
              paddingHorizontal: 10,
              color: "#ccc",
              fontSize: 16,
              position: "absolute",
              bottom: -7,
            }}
          >
            or
          </Text>
        </View>
        {/* google sign in */}
        <Pressable onPress={() => login()} style={styles.oneTapSignIn}>
          {/* <SmallButton
            title={[<AntDesign name="google" size={48} color="#4285F4" />]}
          /> */}
          <Text preset="catagory" style={{ marginEnd: 5 }}>
            Sign in with
          </Text>
          <AntDesign name="google" size={28} color="#4285F4" />
        </Pressable>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 50 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={{ marginTop: "5%", alignSelf: "center" }}
        >
          <Text>
            Don't have an account?
            <Text style={styles.signuptext}> Sign up</Text>
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
  },
});
