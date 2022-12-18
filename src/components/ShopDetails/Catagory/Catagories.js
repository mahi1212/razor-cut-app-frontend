import { View, Text, FlatList, StyleSheet, Pressable, Linking } from 'react-native'
import React from 'react'
import { listItems } from './List'
import { useNavigation } from '@react-navigation/native'
import { spacing } from '../../../theme/spacing'
import { SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors'

export default function Catagories({ shop }) {
    const SingleCatagory = ({ text, icon }) => {
        const navigation = useNavigation()
        const { catagoryImage, singleCatagoryText, catagoryListStyle } = styles;

        return (
            <View style={catagoryListStyle}>
                <Pressable onPress={() => {
                    if(text === 'Website'){
                        Linking.openURL(`${shop.website}`)
                    }else if(text === 'Message'){
                        Linking.openURL(`sms:${shop.phone}`)
                    }else if(text === 'Call'){
                        Linking.openURL(`tel:${shop.phone}`)
                    }else if(text === 'Direction'){
                        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${shop.latitude},${shop.longitude}`)
                    }else{
                        Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${shop.website}`)
                    }
                }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={catagoryImage} >
                        <SimpleLineIcons name={icon} size={28} color={colors.orange} />
                    </View>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text preset='title' style={singleCatagoryText}>{text}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={listItems}
                horizontal={true}
                contentContainerStyle={styles.catagory}
                showsHorizontalScrollIndicator={false}
                key={item => item.id}
                renderItem={({ item }) => (
                    <SingleCatagory text={item.name} icon={item.icon} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    catagory: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing[2],
        marginVertical: spacing[2],
    },
    catagoryListStyle: {
        width: 60,
        marginHorizontal: 6,
        height: 80,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    singleCatagory: {
        width: 60,
        height: 80,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
    },
    catagoryImage: {
        marginVertical: spacing[2],
        borderRadius: '50%',
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FDF1DF",
    },
    singleCatagoryText: {
        marginTop: spacing[1],
        width: '100%',
    },
})