import { Button, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text/Text'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { useEffect } from 'react'
import { auth } from "../../../navigation";
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import themeContext from '../../config/themeContext'
import { useContext } from 'react'

export default function MyBookings() {
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // getDetails(user.email);
                setEmail(user.email)
            } else {
                console.log('Please login first');
            }
        });
    }, []);
    const getDetails = () => {
        fetch(`http://192.168.0.221:5000/history/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
    }
    useEffect(() => {
        getDetails();
    }, [email]);
const theme=useContext(themeContext)
    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]} onLayout={getDetails()}>
            <Text preset="catagory" style={styles.headerText} > FIND YOUR HISTORY </Text>
            {/* card with shadow for shop previously booked */}
            {
                data.length === 0 ? <Text preset="catagory" style={styles.headerText} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>NO BOOKING HISTORY</Text>
                    </View> </Text> :

                    data.map((item, index) => {
                        return (
                            <View style={styles.wraper} key={index}>
                                <Text preset="catagory" style={styles.text} > SHOP NAME: {item.shop_name} </Text>
                                <Text preset="catagory" style={styles.text} > DATE: {item.date} </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text preset="catagory" style={styles.text} > TIME: {item.time} </Text>
                                    {
                                        item.status === 'pending' ?
                                            <Text preset="catagory" style={styles.wariningText} > UPCOMING </Text> :
                                            <Text preset="catagory" style={styles.wariningText} > VISITED </Text>
                                    }
                                </View>
                                <Pressable style={styles.icon} onPress={() => {
                                    navigation.navigate('Review', { email: item.email })
                                }} >
                                    <MaterialIcons name="rate-review" size={24} color={colors.darkOrange} />
                                </Pressable>
                            </View>
                        )
                    })
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkOrange,
        margin: spacing[3],
        paddingVertical: spacing[3],
    },
    wraper: {
        backgroundColor: colors.white, marginHorizontal: spacing[4],
        borderRadius: 10,
        padding: spacing[4],
        marginVertical: spacing[4],
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: spacing[2],
    },
    wariningText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: spacing[2],
        backgroundColor: colors.darkOrange,
        color: colors.white,
        padding: 5,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 20,
        padding: 5,
    },
    container: {flex:1}
})