import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import ProfileHeader from "../components/ProfileCommonComponent/ProfileHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import Text from "../components/text/text";
import DropDown from "../components/DropDown";
import Button from "../components/Button";

export default function EditProfile({ title, backBtn }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <ProfileHeader backBtn={true} title="Edit Profile" />

        <View style={styles.detailsView}>
          <TextInput
            style={styles.textSection} 
            placeholder=" Enter Your First Name"
          />

          <TextInput
            style={styles.textSection}
            placeholder=" Enter Your First Name"
          />
          <View style={styles.inputField}>
            <Text> </Text>
            <MaterialIcons
              name="mark-email-unread"
              size={24}
              color={colors.gray}
            />
          </View>
          <DropDown />

          <DropDown />

          <View></View>
          <Button title="Update" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  detailsView: {
    padding: spacing[3],
  },

  inputField: {
    display: "flex",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginVertical: spacing[3],

    paddingVertical: spacing[3],

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
  },

  textSection: {
    marginVertical: spacing[3],

    paddingVertical: spacing[3],

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
    
  },
  // drop down style
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
