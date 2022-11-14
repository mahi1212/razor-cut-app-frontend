import { View, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import Text from '../text/text'
import { typography } from '../../theme/typography'
import { Ionicons } from '@expo/vector-icons';
export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
                <Text preset="catagory" style={{ fontFamily: typography.bold }}>RazorCut</Text>
            </View>
            {/* notification & bookmark icon */}
            <View style={styles.logoContainer}>
                <Pressable onPress={()=> {console.log("pressed in notification")}}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </Pressable>
                <Pressable onPress={()=> {console.log("pressed in notification")}} style={{marginLeft: 10}}>
                    <Ionicons name="bookmark-outline" size={24} color="black"  />
                </Pressable>
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
    }
})