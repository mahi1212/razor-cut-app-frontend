//payment method

import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
} from "react-native";
import React from "react";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import { spacing } from "../../theme/spacing";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function PaymentOption() {
    const navigation = useNavigation();
    const onPressConfirm = () => {
        navigation.navigate("appointmentConfirm");
    };

    return (
        <SafeAreaView>
            <ProfileHeader backBtn={true} title="Payment Method" />

            <View style={styles.liststyle}>
                <Text style={{ fontSize: 20 }}>Paypal</Text>
                <Image
                    source={{
                        uri: "https://w7.pngwing.com/pngs/803/833/png-transparent-logo-paypal-computer-icons-paypal-blue-angle-logo.png",
                    }}
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 5,
                    }}
                ></Image>
            </View>
            <View style={styles.liststyle}>
                <Text style={{ fontSize: 20 }}>Google Pay</Text>
                <Image
                    source={{
                        uri: "https://e7.pngegg.com/pngimages/63/1016/png-clipart-google-logo-google-logo-g-suite-chrome-text-logo.png",
                    }}
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 5,
                    }}
                ></Image>
            </View>
            <Pressable onPress={() => onPressConfirm()}
                style={styles.liststyle}>
                <Text style={{ fontSize: 20 }}>bKash</Text>
                <Image
                    source={{
                        uri: "https://the-potato.net/extra-images/404_text_01.png",
                    }}
                    style={{
                        height: 50,
                        width: 150,
                        borderRadius: 5,
                    }}
                ></Image>
            </Pressable>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    liststyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: spacing[5],
        borderBottomWidth: spacing[8],
        borderBottomColor: "#E2E2E2",
    },
});