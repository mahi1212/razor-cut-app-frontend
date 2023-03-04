import { View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Text from '../../Text/Text';
import { useNavigation } from '@react-navigation/native';
import themeContext from '../../../config/themeContext';
import { useContext } from 'react';

export default function PageHeader({ title }) {
    const navigation = useNavigation();
    const theme = useContext(themeContext);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
            <Pressable onPress={() => {
                // console.log('Clicked in Back Button')
                navigation.goBack()
            }}>
                <Ionicons name="arrow-back-outline" size={30} style={{color:theme.iconcolors,padding: 5}}  />
            </Pressable>
            <Text preset='catagory' style={{ flexGrow: 1, paddingLeft: 10 ,color:theme.color}}>{title}</Text>
        </View>
    )
}