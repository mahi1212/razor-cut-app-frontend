import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    Pressable,
  } from "react-native";
  import React from "react";
  
  export default function WelcomePage({navigation}) {
  
      const navigateToslider = () => {
          navigation.navigate("onboarding");}
      
    return (
      <View>
        <Pressable
         onPress={() => {
          navigation.navigate("onboarding");
        }}
        
        >
          <ImageBackground
          
            style={styles.bgimage}
            resizeMode="cover"
            source={require("../../assets/welcomepage.jpg")}
          >
            <Text style={styles.text1}>Welcome to</Text>
            <Image
              style={styles.image}
              source={require("../../assets/wave.png")}
            />
            <Text style={styles.text2}>Casca</Text>
  
            <Text style={styles.text3}>The best barber & salon app in this</Text>
  
            <Text style={styles.text3}>
              {" "}
              century for your good looks and beauty.
            </Text>
          </ImageBackground>
        </Pressable>
      </View>
    );
  }
  const styles = StyleSheet.create({
    bgimage: {
      width: "100%",
      height: "100%",
    },
    text1: {
      color: "white",
      fontSize: 50,
      fontWeight: "700",
      marginTop: "120%",
      paddingHorizontal: "6%",
    },
    image: {
      marginTop: "-15%",
      marginLeft: "65%",
      width: "16%",
      height: "10%",
    },
    text2: {
      color: "#FB9400",
      fontSize: 100,
      fontWeight: "800",
      marginTop: "-5%",
      paddingHorizontal: "6%",
    },
    text3: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "500",
      paddingHorizontal: "6%",
    },
  });
  