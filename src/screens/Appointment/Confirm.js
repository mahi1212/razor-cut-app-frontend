import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import ProfileHeader from '../../components/ProfileCommonComponent/ProfileHeader';
import { colors } from '../../theme/colors';
import Button from '../../components/Button';
// import themeContext from '../../config/themeContext';
import { useNavigation } from '@react-navigation/native';


const Confirm = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = async () => {
        try {
            // Generate OTP
            const newOtp = Math.floor(1000 + Math.random() * 9000);
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
            await axios.post('http://192.168.0.103:5000/payment', {
                phoneNumber,
                otp: newOtp
            });
            alert("Your OTP is: " + newOtp);
        } catch (error) {
            console.error(error);
        }
    };
    const handleVerifyOTP = async () => {
        try {
            // Fetch OTP from MongoDB
            const response = await axios.get(`http://192.168.0.103:5000/payment?phoneNumber=${phoneNumber}`);
            const newOtp = response.data[0]?.otp;

            if (!newOtp) {
                console.log('OTP not found for this phone number');
                return;
            }

            if (newOtp === verificationCode) {
                alert("Your OTP is Verified ");

                // console.log('OTP verified successfully');
            } else {
                console.log('Invalid OTP');
            }
        } catch (error) {
            console.error(error);
        }
    };


    //mode 
    // const theme = useContext(themeContext)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ProfileHeader backBtn={true} title="Payment" />
            <View style={{ marginBottom: spacing[9] }}>
                <Text style={{ fontSize: 20, padding: spacing[5], color: theme.color }}>
                    Phone Number
                </Text>
                <TextInput style={styles.liststyle}
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder="Enter phone number"
                    placeholderTextColor={theme.placeHolderTextColor}
                    color={theme.color}
                />
                <Button onPress={handleSubmit} title="Send OTP" />

                <TextInput style={styles.liststyle}
                    value={verificationCode}
                    onChangeText={text => setVerificationCode(text)}
                    placeholder="Enter verification code"
                    placeholderTextColor={theme.placeHolderTextColor}
                    color={theme.color}
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
