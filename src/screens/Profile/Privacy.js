import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
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
import theme from "../../config/theme";
import themeContext from "../../config/themeContext";
import { useContext } from "react";

export default function Privacy({ backBtn, title }) {
  // Language change
  i18n.fallbacks = true;
  i18n.translations = { en, sp, bn };
const theme=useContext(themeContext);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <ProfileHeader backBtn={true} title={i18n.t("Privacy Policy")} />
        <Text style={{
          marginBottom: spacing[5],
          color: theme.color
        }}>
          Our salon app Razor Cut is owned and operated by us. We are committed to protecting the privacy of our users .This Privacy Policy outlines how we collect, use, and protect your personal information when you use the App.
        </Text>
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
              color: theme.color
            }}
          >
            Personal Information We Collect
          </Text>
          <Text style={{ color: theme.color }}>
            When you use the App, we may collect the following types of personal information: {'\n\n'}

            - Contact Information    : Your name, email address, phone number, and other contact information you provide when you register an account with us.{'\n\n'}
            - Location Information   : Your current location or the location you specify when you use the map feature to find salons near you.{'\n\n'}
            - Appointment Information: The date,  time,          and type of service you book through the App.{'\n\n'}
            - Service Information    : The salon services you book or bookmark through the App.
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
              color: theme.color

            }}
          >
            Use of Your Personal Data
          </Text>
          <Text style={{ color: theme.color }}>
            We use your personal information to provide and improve our services, communicate with you about your appointments, and personalize your experience on the App. Specifically, we may use your personal information to:
            {'\n'}
            - Facilitate your use of the App, including booking appointments, accessing map features, and bookmarking services.{'\n'}
            - Contact you about your appointments and other service-related matters.{'\n\n'}
            - Analyze and improve the App's performance, features, and user experience.{'\n\n'}
            - Monitor and prevent fraud, unauthorized access, and other illegal activities.{'\n\n'}
            - Comply with legal obligations, such as responding to court orders or subpoenas.{'\n\n'}
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
              color: theme.color,
              marginBottom: spacing[5],
            }}
          >
            Disclouser of your Personal Data
          </Text>
          <Text style={{
            color: theme.color
          }}>
            We may share your personal information with third-party service providers who help us provide and improve the App. Specifically, we may share your personal information with:
            {'\n'}
            - Cloud service providers who store and process data on our behalf.{'\n'}

            - Payment processing companies who facilitate transactions through the App.{'\n'}

            - Analytics and advertising partners who help us understand how users interact with the App.{'\n\n'}
            We may also share your personal information with law enforcement or other government agencies if we believe it is necessary to comply with legal obligations, prevent fraud, or protect our rights and the rights of others.
          </Text>
        </View>
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
              color: theme.color,
              marginBottom: spacing[5],
            }}
          >
            Your Rights and Choices
          </Text>
          <Text style={{ color: theme.color }}>
            You have the right to access, correct, and delete your personal information. You may also choose to opt-out of receiving marketing communications from us. To exercise these rights or for any questions or concerns about our privacy practices, please contact us at.          </Text>
        </View>
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
              color: theme.color,
              marginBottom: spacing[5],
            }}
          >
            Changes to This Privacy Policy
          </Text>
          <Text style={{ color: theme.color }}>
            We may update this Privacy Policy from time to time to reflect changes in our services or legal obligations. We encourage you to review this Privacy Policy periodically for any updates or changes.
          </Text>
        </View>
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
              color: theme.color,
              marginBottom: spacing[5],
            }}
          >
            Contact Us
          </Text>
          <Text style={{ color: theme.color }}>
            If you have any questions or concerns about our privacy practices or this Privacy Policy, please contact us at [contact information].          </Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
    flex: 1
  },
});