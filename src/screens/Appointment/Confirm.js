import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../../components/ProfileCommonComponent/ProfileHeader';
import Button from '../../components/Button';
// import themeContext from '../../config/themeContext';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import { useEffect } from 'react';
import themeContext from '../../config/themeContext';


const Confirm = ({ route }) => {
     //modes
  const theme=useContext(themeContext)
    const data = route.params.data;
    console.log(data);
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    console.log('otp is ', otp);
    const [verificationCode, setVerificationCode] = useState('');
    var newOtp;
    const handleSubmit = async () => {
        try {
            // Generate OTP
            newOtp = Math.floor(1000 + Math.random() * 9000);
            setOtp(newOtp);
            // Send OTP to phone number using Clickatell API
            // const response = await axios.post('http://192.168.0.103:5000/payment', {
            //   to: phoneNumber,
            //   content: `${newOtp}`
            // }, {
            //   headers: {
            //     'Authorization':   `Bearer $W3HvzU6BSDOZm9HshLnf8g==`
            //   }
            // });
            // Store OTP and phone number in MongoDB
            alert("Your OTP: " + newOtp);
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerifyOTP = async () => {
        try {

            if (otp == verificationCode) {
                axios.post("http://172.20.10.2:5000/appointment", data).then((res) => {
                    if (res.data.insertedId) {
                        // alert("Appointment Booked Successfully");
                        alert("Awesome, Appointment successfully done");
                        navigation.navigate("home");
                    }
                });
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ProfileHeader backBtn={true} title="Payment" />
            <View style={{ marginBottom: spacing[9] }}>
                {/* <Text style={{ fontSize: 20, padding: spacing[5], color: colors.darkOrange }}>
                    Phone Number
                </Text>
                <TextInput style={styles.liststyle}
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder="Enter phone number"
                    // placeholderTextColor={theme.placeHolderTextColor}
                    // color={theme.color}
                    color={colors.darkOrange}
                /> */}
                <Button onPress={handleSubmit} title="Send OTP" />

                <TextInput style={styles.liststyle}
                    value={verificationCode}
                    onChangeText={text => setVerificationCode(text)}
                    placeholder="Enter verification code"
                    // placeholderTextColor={theme.placeHolderTextColor}
                    // color={theme.color}
                    color={colors.darkOrange}
                />
                <Button onPress={handleVerifyOTP} title="Verify OTP" />
            </View>
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    liststyle: {
        padding: spacing[5],
        borderBottomWidth: spacing[4],
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5,
        marginBottom: spacing[3],
        fontSize: 18,
    },
    container: {
        padding: spacing[3],
        flex: 1
    }
});

export default Confirm;
