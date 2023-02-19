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

export default function OwnerHome() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setEmail(user.email);
            } else {
                setUser(null);
            }
        });
    }, []);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    const handleSelect = (option) => {
        setSelectedOption(option);
    };
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
                    console.log('update website')
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>UPDATE WEBSITE ADDRESS</Text>
                </Pressable>
                <Pressable onPress={() => {
                    console.log('update Phone Number')
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
                    console.log('update website')
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>UPDATE WEBSITE ADDRESS</Text>
                </Pressable>
                <Pressable onPress={() => {
                    console.log('update Phone Number')
                }} style={styles.updateButton}>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        color: colors.darkOrange,
                    }}>UPDATE PHONE NUMBER</Text>
                </Pressable>
            </View>
            {/* update button for waiting list */}
            <TouchableOpacity onPress={()=>{
                console.log('update waiting list')
            }} style={{backgroundColor: colors.darkOrange, marginTop: 20, width: 330}}>
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