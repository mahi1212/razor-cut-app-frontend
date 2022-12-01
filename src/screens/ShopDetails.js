import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../components/Text/Text';
import Image from 'react-native-image-progress';
import { colors } from '../theme/colors';
import { useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import Catagories from '../components/ShopDetails/Catagory/Catagories';

const width = Dimensions.get('window').width;

export default function ShopDetails({ route }) {
    const [shop, setShop] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    // console.log(shop)
    const { shopId } = route.params;
    const getSingleShop = async () => {
        setIsLoading(true)
        fetch(`http://192.168.0.221:5000/shops/${shopId}`)
            .then(res => res.json())
            .then(data => {
                setShop(data)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getSingleShop()
    }, [])

    const { container, imageStyle, activeCatagoryButton, heading, line } = styles;
    return (
        <ScrollView contentContainerStyle={container} showsVerticalScrollIndicator={false}>
            <Image source={{ uri: shop.image }} style={imageStyle} />
            <View style={{ marginHorizontal: 10 }}>
                <View style={heading}>
                    <Text preset='h1'>{shop.name}</Text>
                    <Pressable style={activeCatagoryButton}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Open</Text>
                    </Pressable>
                </View>
                {/* icon and text */}
                <View style={styles.iconAndText}>
                    <View style={styles.icon}>
                        <Entypo name='location-pin' size={22} color={colors.darkOrange} />
                    </View>
                    <Text style={styles.text} preset='info'>{shop.street}</Text>
                </View>
                {/* Catagory of shop */}
                <View style={styles.iconAndText}>
                    <View style={styles.icon}>
                        <Entypo name='awareness-ribbon' size={20} color={colors.darkOrange} />
                    </View>
                    <Text style={styles.text} preset='info'>{
                        isLoading ? 'Loading...' : shop.status
                    }</Text>
                </View>
                <Catagories shop={shop} />
                <View style={styles.line} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
    },
    imageStyle: {
        width: width,
        height: 200,
        borderTopRadius: 10,
    },
    activeCatagoryButton: {
        width: 90,
        backgroundColor: colors.darkOrange,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: '50%',
        marginHorizontal: 3,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    icon: {
        backgroundColor: colors.lightOrange,
        marginRight: 5,
    },
    text: {
        fontSize: 14,
    },
    line:{
        width: '97%',
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 10,
    }
})