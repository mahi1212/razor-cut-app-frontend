import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileCommonComponent/ProfileHeader";
import Text from "../components/text/text";
import { spacing } from "../theme/spacing";

export default function Privacy({ backBtn, title }) {
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: spacing[2] }}>
        <ProfileHeader backBtn={true} title="Privacy Policy" />

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
            1.Types of Data We Collect
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
            2.Use of Your Personal Data
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
            3.Disclouser of your Personal Data
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
    </SafeAreaView>
  );
}
