import { View, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Text from '../../text/text';
import { typography } from '../../../theme/typography';
export default function Header() {
    const { container, logo, logoContainer, greetings } = styles
    // getting day or night in user local time
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 18

    const name = "Jenny"
    return (
        <View>
            <View style={container}>
                <View style={logoContainer}>
                    <Image source={require('../../../../assets/images/logo.png')} style={logo} />
                    <Text preset="catagory" style={{ fontFamily: typography.bold }}>RazorCut</Text>
                </View>
                {/* notification & bookmark icon */}
                <View style={styles.logoContainer}>
                    <Pressable onPress={() => { console.log("pressed in notification") }}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </Pressable>
                    <Pressable onPress={() => { console.log("pressed in bookmarks") }} style={{ marginLeft: 10 }}>
                        <Ionicons name="bookmark-outline" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
            <View style={greetings}>
                {isDayTime ? <Text preset='h1'>Morning, </Text> : <Text preset='h1'>Evening, </Text>}
                <Text preset='h1'>{name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    greetings: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    }
})