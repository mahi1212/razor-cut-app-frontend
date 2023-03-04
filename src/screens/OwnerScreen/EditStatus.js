import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../../../navigation";
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditStatus() {
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
        fetch(`http://192.168.0.221:5000/ownerHistory/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
    }
    useEffect(() => {
        getDetails();
    }, [email]);
    return (
        <ScrollView style={{ flex: 1 }} onLayout={getDetails()}>
            <Text preset="catagory" style={styles.headerText} > UPDATE YOUR APPOINTMENTS </Text>
            {/* card with shadow for shop previously booked */}
            {
                data.length === 0 ? <Text preset="catagory" style={styles.headerText} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>NO BOOKING HISTORY FOUND</Text>
                    </View> </Text> :

                    data.map((item, index) => {
                        // console.log(item);
                        const capitalizeStatus = item.status.toUpperCase();
                        // console.log(capitalizeStatus);
                        return (
                            <Pressable style={styles.wraper} key={index}
                                onPress={() => navigation.navigate('ChangeStatus', { item: item })}
                            >
                                <Text preset="catagory" style={styles.text} > DATE: {item.date} </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text preset="catagory" style={styles.text} > TIME: {item.time} </Text>
                                    {
                                        capitalizeStatus == ('PENDING' || 'PENDING ') ?
                                            <Text preset="catagory" style={styles.wariningText} > NOT VISITED</Text> :
                                            <Text preset="catagory" style={styles.wariningText} > VISITED </Text>
                                    }
                                </View>
                            </Pressable>
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
    }
})