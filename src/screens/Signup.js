import { View, Pressable, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
// import Checkbox from "expo-checkbox";
// import Button from "../components/button";
// import SmallButton from "../components/smallButton";
import { FontAwesome } from "@expo/vector-icons";
import Input from "../components/Login/input";
import Checkbox from "expo-checkbox";
import Button from "../components/Login/button";
import { useNavigation } from "@react-navigation/native";
import SmallButton from "../components/Login/SmallButton";
import { colors } from "../theme/colors";
import Text from "../components/Text/Text";
import OrText from "../components/Login/OrText";
import GoogleButton from "../components/Login/GoogleButton";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import auth from "@react-native-firebase/auth";

export default function Signup() {
  const navigation = useNavigation();
  const [agree, setAgree] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //call post
  const saveUser = (email, password) => {
    const user = { email, password };
    fetch("http://localhost:5012/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  //hadle signup function

  const handleSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      saveUser(email, password);
      // const docRef = await addDoc(collection(db,"users2"),{
      //   email:email,
      //   password:password,
      //   uid:result.user.uid,
      //   // remember:remember,
      // })
      console.log("result---->", result);
    } catch (error) {
      console.log(error, "error-->");
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      {/* title */}
      <View>
        <Text style={styles.title1}>Create Your</Text>
        <Text style={styles.title2}>Account</Text>
      </View>
      {/* input fields */}
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
      </View>
      <Pressable
        onPress={() => {
          console.log("Login Clicked");
        }}
      >
        <View
          style={{
            backgroundColor: colors.darkOrange,
            padding: 15,
            marginHorizontal: 5,
            borderRadius: 30,
            marginVertical: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Sing Up
          </Text>
        </View>
      </Pressable>
      {/* or text */}
      <OrText />
      {/* google sign up */}
      <GoogleButton title="up" />
      {/* linking text */}
      <View style={{ position: "absolute", bottom: 0, left: 50 }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text>
            Already have an account?
            <Pressable
              onPress={() => {
                navigation.navigate("Signin");
              }}
            >
              <Text style={styles.signuptext}>Sign In</Text>
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
    marginBottom: "20%",
  },
  ortext: {
    color: "grey",
    marginTop: "30%",
    alignSelf: "center",
    fontSize: 20,
  },
  button: {
    color: "#FB9400",
    fontWeight: "bold",
    marginLeft: "6%",
  },
  signuptext: {
    color: "#FB9400",
    fontWeight: "bold",
    marginLeft: "6%",
    marginBottom: -2,
  },
});
