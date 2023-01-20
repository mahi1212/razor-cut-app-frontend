import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, ScrollView, StyleSheet, Vibration } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import SwitchInput from "../../components/ProfileCommonComponent/SwitchInput";
import { spacing } from "../../theme/spacing";
import i18n from "i18n-js";
import {
  en,
  sp,
  bn,
} from "../../components/ProfileCommonComponent/localizations";


export default function Notification({ title, backBtn, text }) {
  const ONE_SECOND_IN_MS = 1000;
  const navigation = useNavigation();
  //language change
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };
  return (
    <SafeAreaView>
      <ScrollView style={styles.detailsView}>
        <ProfileHeader backBtn={true} title="Notification" />

        {/*     
        <Button
        title="Stop vibration pattern"
        onPress={() => Vibration.cancel()}
        color="#FF0000"
      />
       <Button
                title="Vibrate for 10 seconds"
                onPress={() => Vibration.vibrate(2 * ONE_SECOND_IN_MS)}
              /> */}

        <SwitchInput
        text={i18n.t("Sound")}
          // text="Sound"
          color="#FF0000"
          onPress={() => Vibration.cancel()}
        />

        <SwitchInput
            text={i18n.t("Vibrate")}
          onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
        />

        <SwitchInput
          text={i18n.t("Special Offers")}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />

        <SwitchInput  text={i18n.t("Promo & Discount")} />

        <SwitchInput  text={i18n.t("New Service Available")} />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  detailsView: {
    padding: spacing[3],
  },
});
