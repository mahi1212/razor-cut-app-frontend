import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../components/input";
import Checkbox from "expo-checkbox";
import SmallButton from "../components/Login/smallButton";
import Button from "../components/Login/button"
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";





export default function SigninWithEmail({navigation}) {
  const navigateToSignIn = () => {
    navigation.navigate("Signup");}
  const [agree, setAgree] = useState(false);

  
  return (
    <>
      <View>
        <Text
          style={styles.title1}
        >
          Create Your
        </Text>
        <Text
          style={styles.title2}
        >
          Account
        </Text>
      </View>
      <View style={{ paddingHorizontal: 18, paddingVertical: 25 }}>
        <Input placeholder="Email" title={"phone"} />
        <Input placeholder="Password" secureTextEntry />
        <View>
          <Checkbox
            value={agree}
            onValueChange={() => setAgree(!agree)}
            color={agree ? "#FB9400" : undefined}
            style={styles.checkbox}
          />
          <Text
            style={styles.checkboxtext}
          >
            Remember me
          </Text>
          <Button title={"Sign up"} />
        </View>
        <View>
          <Text
            style={{
              color: "grey",
              marginTop: 100,
              alignSelf: "center",
              fontSize: 20,
            }}
          >
            ________________ or continue with _______________{" "}
          </Text>
        </View>
        {/* <SmallButton title={'signin'}/> */}
        {/* <Test name="email" icon="user"/> */}
        <View
         style={styles.view1}
        >
          <SmallButton
            title={[
              <FontAwesome name="phone" size={48} color="black" />,
            ]}
          />
          <View   style={styles.view2}>
            <SmallButton
              title={[<AntDesign name="google" size={48} color="#4285F4" />]}
            />
          </View>
         <View  style={styles.view3}>
         <SmallButton
            title={[<FontAwesome name="apple" size={48} color="black" />]}
          />
         </View>
        </View>
      </View>

      <View>
      <Pressable
        onPress={() => {
          navigation.navigate("Signin");
        }}
        style={{ marginTop: 20, alignSelf: "center" }}
      >
        <Text>
          Already have an account?{""}
          <Text
            style={styles.button}
          >
            Sign in
          </Text>
        </Text>
      </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  title1:{
    fontSize: 58,
    alignSelf: "flex-start",
    fontWeight: "700",
    paddingHorizontal:20
  } ,
  title2:{
    fontSize: 58,
    alignSelf: "flex-start",
    marginTop: -10,
    fontWeight: "700",
    paddingHorizontal:20
  },
  checkbox:{
    alignSelf: "center",
    marginRight: 140, 
    marginBottom: 20,
    marginTop:0 
  },
  checkboxtext:{
    marginTop: -38, 
    alignSelf: "center",
    marginBottom: 80 
  },
  view1:{
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
    marginLeft:40
  },
  view2:{
    display: "flex",
    justifyContent: "space-between",
    marginTop: -75,
    marginLeft:115
  },
  view3:{
    display: "flex",
    justifyContent: "space-between",
    marginTop: -75,
    marginLeft:230
  },
  button:{
    color: "#FB9400",
    fontWeight: "bold",
    marginLeft: 20
  }
});

