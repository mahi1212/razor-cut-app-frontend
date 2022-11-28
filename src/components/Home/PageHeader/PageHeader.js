import { View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Text from '../../text/text';
import { useNavigation } from '@react-navigation/native';

export default function PageHeader({ title }) {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
            <Pressable onPress={() => {
                console.log('Clicked in Back Button')
                navigation.goBack()
            }}>
                <Ionicons name="arrow-back-outline" size={30} color={Colors.darkOrange} />
            </Pressable>
            <Text preset='catagory' style={{ flexGrow: 1, textAlign: 'center' }}>{title}</Text>
        </View>
    )
}