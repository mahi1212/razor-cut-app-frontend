import { View, StyleSheet, Pressable, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import Text from '../../Text/Text';
import { colors } from '../../../theme/colors';
import Image from 'react-native-image-progress';
let deviceWidth = Dimensions.get('window').width

export default function SingleShop({ shop, cart, setCart, visibleIcon }) {
    const { name, image, rating, waiting, avgTime, address, _id } = shop;
    const { avgTimeAndRatingContainer, shopContainer, innerShopContainer, img, middleDiv, info, avgTimeText, ratingText, bookmarkIcon } = styles;
    // console.log(visibleIcon)
    return (
        <Pressable style={shopContainer}>

            <View style={innerShopContainer}>
                <Image source={{ uri: image }} style={img} />
                {/* middle part */}
                <View style={middleDiv}>
                    <Text preset='title'>{name}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                        <Entypo name="location-pin" size={16} color={colors.orange} />
                        <Text preset='info'>{address}</Text>
                    </View>
                    {/*  */}
                    <View style={info} >
                        <View style={avgTimeAndRatingContainer}>
                            {/* showing estimated time for waiting*/}
                            <FontAwesome5 name="business-time" size={14} color={colors.orange} />

                            {
                                ((waiting * avgTime) / 60).toFixed(2) > 1 ?
                                    <Text preset='info' style={avgTimeText}>{((waiting * avgTime) / 60).toFixed(2)} hr</Text> :
                                    <Text preset='info' style={avgTimeText}>{(waiting * avgTime)} min</Text>
                            }

                        </View>
                        <View style={avgTimeAndRatingContainer}>
                            {/* showing queue */}
                            <Fontisto name="person" size={12} color={colors.orange} />
                            <Text preset='info' style={avgTimeText}>{waiting} Waiting</Text>
                        </View>
                        <View style={avgTimeAndRatingContainer}>
                            {/* Rating showing based on realtime user rating */}
                            <FontAwesome name="star" size={14} color={colors.orange} />
                            <Text preset='info' style={ratingText}>{rating.reduce((a, b) => a + b) / rating.length}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* bookmark icon | this is last half of SingleShop component horizontally*/}
            {
                (visibleIcon === true) &&
                (cart.includes(_id) ?
                    <Pressable
                        onPress={
                            // remove single shop from cart
                            () => setCart(cart.filter((item) => item !== _id))
                        }
                        style={bookmarkIcon}>
                        <MaterialCommunityIcons name="bookmark-minus" size={30} color={colors.darkOrange} />
                    </Pressable>
                    :
                    <Pressable
                        onPress={() => {
                            setCart([...cart, _id])
                            console.log(_id, 'added')
                            // saving to async storage
                            // saveCart()
                        }}
                        style={styles.bookmarkIcon}>
                        <Ionicons name="bookmark-outline" size={26} color="black" />
                    </Pressable>)


            }
        </Pressable>
    )
}

// Styles for home screen
const styles = StyleSheet.create({
    shopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: .4,
        backgroundColor: '#fff',
        borderColor: '#f5f4f2',
        borderRadius: 10,
        shadowColor: '#f5f4f2',
        shadowOffset: { width: 3, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        width: deviceWidth,
    },
    innerShopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    img: {
        width: 65,
        height: 65,
        borderRadius: 5
    },
    middleDiv: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 60,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avgTimeText: {
        fontSize: 12,
        marginHorizontal: 5
    },
    avgTimeAndRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 1
    },
    ratingText: {
        fontSize: 12,
        marginHorizontal: 5
    },
    bookmarkIcon: {
        alignSelf: 'flex-start',
        marginRight: 20
    },

})