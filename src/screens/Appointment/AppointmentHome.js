import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/Text/Text";
import { spacing } from "../../theme/spacing";
import Button from "../../components/Button";
import { colors } from "../../theme/colors";
import MoreInfo from "../../components/AppointmentComponent/MoreInfo";
import Specialist from "./Specialist/Specialist";
import Aboutus from "./Details/Aboutus";
import Nav from "../../components/AppointmentComponent/Nav";
import Navbar from "./Details/Navbar";
export default function AppointmentHome({ navigation }) {
  const onPressEdit = () => {
    navigation.navigate("Edit");
  };

  const onPressNotification = () => {
    navigation.navigate("Notification");
  };

  const onPressPayment = () => {
    navigation.navigate("Payment");
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ padding: spacing[2] }}>
          {/* profile img start */}
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://hips.hearstapps.com/harpersbazaar/assets/16/01/1452279902-gettyimages-145083553-copy.jpg",
              }}
              style={{
                resizeMode: "cover",
                height: 250,
              }}
            ></Image>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "-15%",
                marginLeft: "30%",
              }}
            >
              <Ionicons
                name="remove-outline"
                size={24}
                style={styles.text}
                color="#FCB615"
              />
              <AntDesign
                name="ellipsis1"
                size={24}
                style={styles.text}
                color="white"
              />
            </View>
          </View>
          {/* profile img end */}

          <View style={styles.styleText}>
            <Text preset="h2">Barbarella</Text>
            <Button title="     open     "></Button>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: spacing[2],
            }}
          >
            <Entypo name="location-pin" size={24} style={styles.iconColor} />
            <Text>address</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: spacing[2],
            }}
          >
            <MaterialIcons
              name="star-rate"
              size={24}
              style={styles.iconColor}
            />
            <Text>Reviews</Text>
          </View>
          {/* more info */}
          <View style={styles.catagoryListStyle}>
            <MoreInfo title="Website" name="web" />
            <MoreInfo title="Message" name="android-messages" />
            <MoreInfo title="Phone" name="call-missed" />
            <MoreInfo title="Direction" name="directions" />
            <MoreInfo title="Share" name="share-all-outline" />
          </View>
          {/* Specialist section */}
          <View>
            <View style={styles.styleText}>
              <Text preset="catagory">Our Specialist</Text>
              <Text preset="h5" style={{ color: colors.orange }}>
                See All
              </Text>
            </View>
            <Specialist />
          </View>
          {/* end sectiono */}
          {/* details section start */}
          <Aboutus />
        </View>

{/* <Navbar onPress={() => onPressEdit("Edit")}/> */}
{/* <Navbar onPress={() => onPressEdit()}/> */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // overflow:"scroll",
            overflow:"visible"
          }}
          
        >
          <Nav title="aboutUs" onPress={() => onPressEdit()} />
          <Nav title="aboutUs" onPress={() => onPressEdit()} />
          <Nav title="aboutUs" onPress={() => onPressEdit()} />
          <Nav title="aboutUs" onPress={() => onPressEdit()} />
        </View>

        <Button title="Book Now"></Button>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 72,
    fontWeight: "bold",
  },
  styleText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing[3],
    alignItems: "center",
  },
  iconColor: {
    color: colors.orange,
    marginRight: spacing[3],
  },
  catagoryListStyle: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
  },
});
