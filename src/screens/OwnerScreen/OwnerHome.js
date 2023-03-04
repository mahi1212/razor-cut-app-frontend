import {
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import React from 'react'
import { auth } from '../../../navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import Dropdown from "./Dropdown";
import Text from "../../components/Text/Text";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function OwnerHome() {
    const [email, setEmail] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
            } else {
                setEmail(null);
            }
        });
    }, []);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const navigation = useNavigation();
    const handleSelect = (option) => {
        setSelectedOption(option);
    };
    const updateWaitingList = () => {
        if (selectedOption === null) {
            alert('Please select a number');
            return;
        }
        console.log(selectedOption);
        const data = {
            waiting: selectedOption
        }
        axios.put(`http://192.168.0.221:5000/shopss/${email}`, data)
            .then(res => {
                console.log(res);
                alert('WAITING LIST UPDATED SUCCESSFULLY')
            }).catch(err => {
                alert(err)
            })
    };
    // main function
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* wating dropdown */}
            <Dropdown options={options} onSelect={handleSelect} />
            {selectedOption && <Text style={{ marginTop: -20 }}>WAITING QUEUE SELECTED = {selectedOption}</Text>}
            {/* Update buttons */}
            <Text preset="catagory" style={{ marginVertical: 20 }}>WANT TO UPDATE ?</Text>
            {/* Update website and phone */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginTop: 10 }}>
                <Pressable onPress={() => {
                    navigation.navigate('UpdatePage', { type: 'website', email: email })
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>UPDATE WEBSITE ADDRESS</Text>
                </Pressable>
                
                <Pressable onPress={() => {
                    navigation.navigate('UpdatePage', { type: 'phone', email: email })
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>UPDATE PHONE NUMBER</Text>
                </Pressable>
            </View>
            {/* Update website and phone */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginTop: 10 }}>
                <Pressable onPress={() => {
                    navigation.navigate('UpdatePage', { type: 'offer', email: email })
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>ADD SPECIAL OFFER</Text>
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate('UpdatePage', { type: 'location', email: email })
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>UPDATE LOCATION</Text>
                </Pressable>
            </View>
            {/* update button for waiting list */}
            <TouchableOpacity onPress={() => {
                console.log('update waiting list')
                updateWaitingList(selectedOption);
            }} style={{ backgroundColor: colors.darkOrange, marginTop: 20, width: '95%' }}>
                <Text style={{
                    textAlign: 'center',
                    padding: 10,
                    color: '#fff',
                }}>UPDATE WAITING LIST</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    updateButton: {
        width: '45%',
        padding: 20,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,

    }
});