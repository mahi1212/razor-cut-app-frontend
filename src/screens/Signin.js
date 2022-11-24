import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import Button from "../components/Login/button"
import Input from "../components/Login/input"
import SmallButton from "../components/smallButton";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {spacing} from '../theme/spacing'

export default function Signin({navigation}) {
  const navigateToSignIn = () => {
    navigation.navigate("Signup");
  };
  

  const [agree, setAgree] = useState(false);
  return (
    <>
      <View>
        <Text
          style={styles.title1}
        >
          Login to Your
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
          <Button title={"Sign in"} />
        </View>
        <View>
          <Text
            style={styles.ortext}
          >
            ________________ or continue with _______________{" "}
          </Text>
        </View>
        <View
          style={styles.view1}
        >
          <SmallButton
            title={[
              <FontAwesome name="phone" size={48} color="black" />,
            ]}
          />
          <View  style={styles.view2}>
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
          navigation.navigate("Signup");
        }}
        style={{ marginTop: '5%', alignSelf: "center" }}
      >
        <Text>
        Don't have an account?{""}
          <Text
            style={styles.signuptext}
          >
            Sign up
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
        paddingHorizontal:spacing[6]
      },
      title2:{
        fontSize: 58,
        alignSelf: "flex-start",
        marginTop: '-5%',
        fontWeight: "700",
        paddingHorizontal:spacing[6]
      },
      checkbox:{
        alignSelf: "center", 
        marginRight: '40%',
        marginBottom: '5%',
        marginTop:0
      },
      checkboxtext:{
        marginTop: '-10%',
        alignSelf: "center", 
        marginBottom: '20%' 
      },
      ortext:{
        color: "grey",
        marginTop: '30%',
        alignSelf: "center",
        fontSize: 20,
      },
      view1:{
        display: "flex",
        justifyContent: "space-between",
        marginTop: '10%',
        marginLeft:'10%'
      },
      view2:{
        display: "flex",
        justifyContent: "space-between",
        marginTop: '-22%',
        marginLeft:'33.5%'
      },
      view3:{
        display: "flex",
        justifyContent: "space-between",
        marginTop: '-22%',
        marginLeft:'66%'
      },
      signuptext:{
        color: "#FB9400",
        fontWeight: "bold",
        marginLeft: '6%'
      }

});
