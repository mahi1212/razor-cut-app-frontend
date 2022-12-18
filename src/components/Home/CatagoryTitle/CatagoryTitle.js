import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors';
import Text from '../../Text/Text';
import { useNavigation } from '@react-navigation/native';

// catagory list title and see all - Common component | ex: suggested for you 
export default function CatagoryTitle({ title, btn, datalist }) {
    const { headerContainer, textStyle, btnStyle } = styles;
    const navigation = useNavigation();
    return (
        <View>
            <View style={headerContainer}>
                <Text preset='title' style={textStyle}>{title}</Text>
                <Pressable onPress={() =>
                    navigation.navigate('SeeAll', {
                        title: title,
                        datalist: datalist,
                    })
                } style={{ padding: 10 }}>
                    <Text preset='title' style={btnStyle}>{btn}</Text>
                </Pressable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textStyle: {
        marginVertical: 15,
        fontSize: 18,
        marginLeft: 5
      },
      btnStyle: {
        fontWeight: '800',
        color: colors.darkOrange
      },
})