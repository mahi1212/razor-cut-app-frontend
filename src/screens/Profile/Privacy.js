import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/Text/Text";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import { spacing } from "../../theme/spacing";
import { StatusBar } from "expo-status-bar";

import * as Localization from "expo-localization";
import i18n from "i18n-js";
import {
  en,
  sp,
  bn,
} from "../../components/ProfileCommonComponent/localizations";

export default function Privacy({ backBtn, title }) {
  // Language change
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: spacing[2] }}>
        <ProfileHeader backBtn={true} title={i18n.t("Privacy Policy")}  />

        <View
          style={{
            padding: spacing[3],
            marginBottom: spacing[5],
          }}
        >
          <Text
            preset="h5"
            style={{
              fontWeight: "bold",
              marginBottom: spacing[5],
            }}
          >
            .{i18n.t("Types of Data We Collect")}
          </Text>
          <Text>
            Est gubergren sadipscing sit aliquyam amet, erat sit et dolor dolor
            sanctus, takimata ipsum ipsum lorem sit amet. Eirmod duo consetetur
            vero stet sanctus, accusam aliquyam dolore stet eirmod invidunt,
            consetetur takimata dolor et labore sed consetetur dolor sanctus
            gubergren. Erat vero diam takimata duo dolor et invidunt erat,
            magna.
          </Text>
        </View>
        {/* personal data */}
        <View
          style={{
            padding: spacing[3],
            marginBottom: spacing[5],
          }}
        >
          <Text
            preset="h5"
            style={{
              fontWeight: "bold",
              marginBottom: spacing[5],
            }}
          >
            .{i18n.t("Use of Your Personal Data")}
          </Text>
          <Text>
            Est gubergren sadipscing sit aliquyam amet, erat sit et dolor dolor
            sanctus, takimata ipsum ipsum lorem sit amet. Eirmod duo consetetur
            vero stet sanctus, accusam aliquyam dolore stet eirmod invidunt,
            consetetur takimata dolor et labore sed consetetur dolor sanctus
            gubergren. Erat vero diam takimata duo dolor et invidunt erat,
            magna.
          </Text>
        </View>
        {/* disclosure */}
        <View
          style={{
            padding: spacing[3],
            marginBottom: spacing[5],
          }}
        >
          <Text
            preset="h5"
            style={{
              fontWeight: "bold",
              marginBottom: spacing[5],
            }}
          >
            .{i18n.t("Disclouser of your Personal Data")}
          </Text>
          <Text>
            Est gubergren sadipscing sit aliquyam amet, erat sit et dolor dolor
            sanctus, takimata ipsum ipsum lorem sit amet. Eirmod duo consetetur
            vero stet sanctus, accusam aliquyam dolore stet eirmod invidunt,
            consetetur takimata dolor et labore sed consetetur dolor sanctus
            gubergren. Erat vero diam takimata duo dolor et invidunt erat,
            magna.
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />

    </SafeAreaView>
  );
}
