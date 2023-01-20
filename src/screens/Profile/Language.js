import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  en,
  sp,
  bn,
} from "../../components/ProfileCommonComponent/localizations";
import { useState } from "react";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { spacing } from "../../theme/spacing";
import Text from "../../components/Text/Text";
import Button from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";

export default function Language() {
  let [locale, setLocale] = useState(Localization.locale);
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };
  i18n.locale = locale;

  return (
    <SafeAreaView>
      <ProfileHeader backBtn={true} title={i18n.t("header")} />
      <View style={{ padding: spacing[3] }}>
        <Text style={styles.texts}>{i18n.t("language")}</Text>
        <View style={styles.btn}>
          <Button title="     Bangla       " onPress={() => setLocale("bn")} />
        </View>
        <View style={styles.btn}>
          <Button title="     English     " onPress={() => setLocale("en")} />
        </View>
        <View style={styles.btn}>
          <Button title="     Spanish      " onPress={() => setLocale("sp")} />
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  texts: {
    alignSelf: "center",
    marginTop: spacing[5],
    fontSize: 22,
    marginBottom: spacing[8],
  },
  btn: {
    marginBottom: spacing[5],
  },
});
