import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuth from "../firebase/firebase.init";
import Button from "../components/Login/button"
import Button2 from "../components/Login/button2"
import "expo-dev-client";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { colors } from "../theme/colors";


initializeAuth();

export default function LoginRoutes({ navigation,h1 }) {
  const navigateToSignUp = () => {
    navigation.navigate("signup");
  };
  const navigateToSignUpWithmail = () => {
    navigation.navigate("Signinwithmail");
  };
  const navigateToSignUpWithgoogle = () => {
    navigation.navigate("Signinwithgoogle");
  };
  const navigateToSignUpWithApple = () => {
    navigation.navigate("Signinwithapple");
  };
  const handleSigninWithApple = () => {};

  
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGooglesignIn = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  };

  return (
    <>
      <View>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View>
        <Text
          style={styles.title}
        

        >
          Let's you in
        </Text>
      </View>
      <View style={{ marginTop: '-18%', alignSelf: "center" }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Signinwithphone");
          }}
          style={{ marginTop: '8%', alignSelf: "center" }}
        >
          <Button2
            onPress={() => {
              navigation.navigate("Signinwithphone");
            }}
            title={[
              <FontAwesome name="phone" size={24} color="black" />,
              "     Continue with phone",
            ]}
          />
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Signinwithgoogle");
          }}
          style={{ marginTop: '6%', alignSelf: "center" }}
        >
          <Button2
            onPress={handleGooglesignIn}
            title={[
              <AntDesign name="google" size={24} color="#4285F4" />,
              "   Continue with Google",
            ]}
          />
        </Pressable>

        <Pressable
          style={{ marginTop: '6%', alignSelf: "center" }}
        >
          <Button2
            onPress={handleGooglesignIn}
            title={[
              <FontAwesome name="apple" size={24} color="black" />,
              "   Continue with Apple",
            ]}
          />
        </Pressable>
      </View>
      <View>
        <Text style={{ color: "grey", marginTop: '4%', alignSelf: "center" }}>
          __________________________________     or    ________________________________
          
        </Text>

        {/* <View>
          <View>
            <Text style={{paddingHorizontal:'3%',marginLeft:'3%'}}>
              
              _____________________________________________________________________
            </Text>
          </View>
          <View>
            <Text style={{paddingVertical:'2%', paddingHorizontal:'10%' ,backgroundColor:'pink',  right:'30%' ,position:'absolute',marginTop:'-2%',marginLeft:'45%'}}>or</Text>
          </View>
        </View> */}
      </View>
      <View style={{ marginTop: '5%', alignSelf: "center" }}>
        <Pressable>
          <Button
            onPress={() => {
              navigation.navigate("Signinwithmail");
            }}
            title={"Sign up with password"}
          />
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={{ marginTop: '5%', alignSelf: "center" }}
      >
        <Text>
          Don't have an account?{""}
          <Text
            style={{ color:colors.orange, fontWeight: "bold", marginLeft: '6%' }}
          >
            Sign up
          </Text>
        </Text>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
image:{
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 100,
},
title:{
    fontSize: 58,
    marginTop: -150,
    alignSelf: "center",
    fontWeight: "800",
    
}
});