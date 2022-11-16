import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../theme/spacing";
import Lists from "../components/ProfileCommonComponent/Lists";
import { colors } from "../theme/colors";

import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";




export default function Profile({ navigation }) {
  //navigate to edit page
  const onPressEdit = () => {
    navigation.navigate("Edit");
  };

  const onPressNotification = () => {
    navigation.navigate("Notification");
  };

  const onPressPayment = () => {
    navigation.navigate("Payment");
  };

  const onPressSecurity = () => {
    navigation.navigate("Security");
  };

  const onPressLng = () => {
    navigation.navigate("Language");
  };

  const onPressPrivacy = () => {
    navigation.navigate("Privacy");
  };
  //icons
  function Icon({ fontFamily, name, colors }) {
    if (fontFamily === "AntDesign") {
      return <AntDesign name={name} size={24} color={colors} />;
    } else if (fontFamily === "MaterialCommunityIcons") {
      return <MaterialCommunityIcons name={name} size={24} color={colors} />;
    } else if (fontFamily === "Ionicons") {
      return <Ionicons name={name} size={24} color={colors} style={{display:"flex"}}/>;
    } else if (fontFamily === "MaterialIcons") {
      return <MaterialIcons name={name} size={24} color={colors} />;
    } else if (fontFamily === "FontAwsome") {
      return <FontAwesome name={name} size={24} color={colors} />;
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: spacing[3] }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24 }}>Profile</Text>

          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={24}
            color="black"
          />
        </View>

        {/* header section done */}
        <View style={styles.profilesection}>
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                resizeMode: "contain",
                margin: spacing[4],
              }}
              source={{
                uri: "https://c0.wallpaperflare.com/preview/338/184/835/parrot-colorful-bird-feathered.jpg",
              }}
            />
          </View>
          <Text preset="h2" style={{ marginBottom: spacing[4] }}>
            NAME
          </Text>
          <Text>Email</Text>
        </View>

        {/* 3rd section of  Profile */}
        {/* edit profile */}
        <View style={{ marginBottom: spacing[4],padding:spacing[3] }}>
          <Icon
            fontFamily={"MaterialCommunityIcons"}
            name="account"
            color={colors}
          />
          <Lists title="Edit Profile" onPress={() => onPressEdit()} />
        </View>

        {/* notification section */}
        <View style={{ marginBottom: spacing[4],padding:spacing[3] }}>
          <Icon
            fontFamily={"Ionicons"}
            name="notifications-outline"
            color={colors}
          />

          <Lists title="Notification" onPress={() => onPressNotification()} />
        </View>

        {/* payment section */}
        <View style={{ marginBottom: spacing[4],padding:spacing[3] }}>
          <Icon fontFamily={"MaterialIcons"} name="payment" color={colors} />
          <Lists title="Payment" onPress={() => onPressPayment()} />
        </View>

        {/* security section */}
        <View style={{ marginBottom: spacing[4],padding:spacing[3] }}>
          <Icon fontFamily={"MaterialIcons"} name="security" color={colors} />
          <Lists title="Security" onPress={() => onPressSecurity()} />
        </View>

        {/* language */}
        <View style={{ marginBottom: spacing[4],padding:spacing[3] }}>
          <Icon fontFamily={"FontAwsome"} name="language" color={colors} />
          <Lists title="Language" onPress={() => onPressLng()} />
        </View>

        {/* privacy */}
        <View style={{ marginBottom: spacing[4],padding:spacing[3] }}>
          <Icon fontFamily={"MaterialIcons"} name="privacy-tip" color={colors} />
          <Lists title="Privacy" onPress={() => onPressPrivacy()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profilesection: {
    padding: spacing[2],

    alignItems: "center",

    justifyContent: "center",

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,

    marginBottom: spacing[6],
  },
});
