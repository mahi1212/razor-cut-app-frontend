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
import { useContext } from "react";
import themeContext from "../../config/themeContext";
import { colors } from "../../theme/colors";

export default function PaymentOption({route}) {
    const data = route.params.data;
    // console.log(data);
    const navigation = useNavigation();
    const onPressConfirm = () => {
        navigation.navigate("confirm", { data: data });
    };
    const theme=useContext(themeContext)
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ProfileHeader backBtn={true} title="Payment Method" />

            <Pressable onPress={() => onPressConfirm()}
                    style={styles.liststyle}>
                    <Text style={{ fontSize: 20 ,color:colors.gray}}>bKash</Text>
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
        height: 500,
        // borderWidth: 1,
        // borderColor: "black",
    },
    container:{
        flex: 1,
    }
});