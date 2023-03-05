import { View, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from "react-native";
import React, { useState } from "react";
import Input from "../components/Login/input";
import Checkbox from "expo-checkbox";
// import Button from "../components/Login/button";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import Text from "../components/Text/Text";
import OrText from "../components/Login/OrText";
import GoogleButton from "../components/Login/GoogleButton";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../../navigation";

export default function Signup() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // post user to database
  const saveUser = (name, phone, email, password, role) => {
    const user = { name, phone, email, password, role };

    fetch("http://172.20.10.2:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  //hadle signup function
  const handleSignup = () => {
    // validation
    if (phone.length !== 11 || phone.includes('017' || '016' || '013' || '019' || '018') == false) {
      alert('INVALID PHONE NUMBER')
      return;
    }
    // regex for name - DOT AND NUMBER NOT ALLOWED
    const nameRegex = /^[a-zA-Z ]+$/;

    if (nameRegex.test(name)) {
      console.log("Valid name");
    } else {
      alert("Invalid name");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        // Email verification sent!
        sendEmailVerification(auth.currentUser).then(() => {
          alert("Email verification sent! Confirm your email to login");

        });
        // update display name
        updateProfile(auth.currentUser, {
          displayName: name,
          phoneNumber: phone,
        }).catch((error) => {
          alert(error.message);
        });
        // send OTP to the user's email

      })
      .catch((error) => {
        const errorMessage = error.message;
        // handling errors
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          alert("Email already exists!");
        } else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
          alert("Password must be 6 characters long or more");
        } else {
          alert(errorMessage);
        }
      });
    saveUser(name, phone, email, password, 'user');
  };
  // main function
  return (
    <KeyboardAvoidingView style={{ flex: 1, marginHorizontal: 20 }}>
      {/* title */}
      <View>
        <Text style={styles.title1}>Create Your</Text>
        <Text style={styles.title2}>Account</Text>
      </View>
      {/* input fields name, phone and others*/}
      <View style={{ marginTop: 60 }}>
        <Input placeholder="Name" onChangeText={(text) => setName(text)} />
        <Input placeholder="Phone" onChangeText={(text) => setPhone(text)} />
        <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry={true}
        />
      </View>
      {/* signup button */}
      <Pressable
        onPress={() => {
          handleSignup();
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
          {/* text of button */}
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Sing Up
          </Text>
        </View>
      </Pressable>
      {/* or text */}
      <OrText />
      {/* google sign up */}
      {/* <GoogleButton title="up" /> */}
      {/* linking text */}
      <View style={{ marginTop: 20, alignSelf: 'center' }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Signin");
          }}
          style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
        >
          <Text>Already have an account? </Text>
          <Text style={styles.signuptext}>Sign In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  title1: {
    marginTop: 30,
    fontSize: 38,
    alignSelf: "flex-start",
    fontWeight: "700",
    color: colors.darkOrange,
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
    marginLeft: 10,
  },
});
