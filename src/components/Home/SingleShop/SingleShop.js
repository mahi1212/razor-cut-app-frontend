import { View, StyleSheet, Pressable, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import Text from '../../Text/Text';
import { colors } from '../../../theme/colors';
import Image from 'react-native-image-progress';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import themeContext from '../../../config/themeContext';
import { useContext } from 'react';

let deviceWidth = Dimensions.get('window').width

export default function SingleShop({ shop, visibleIcon, avg, deleteIcon }) {
    
    const [cart, setCart] = useState([]);
    const getCart = async () => {
        try {
            const value = await AsyncStorage.getItem('cart')
            // console.log(value)
            setCart(JSON.parse(value))
        } catch (e) {
            console.log(e)
        }
    }
    getCart();
    const deleteShop = (id) => {
        // console.log(id)
        axios.delete(`http://192.168.0.221:5000/shops/${id}`)
            .then(res => {
                // console.log(res)
                alert('Shop deleted successfully')
            }, (error) => {
                alert(error)
            }
            )

    }
    var { name, image, waiting, avgTime, address, _id, email } = shop;

    // console.log(_id);
    const { avgTimeAndRatingContainer, shopContainer, innerShopContainer, img, middleDiv, info, avgTimeText, ratingText, bookmarkIcon } = styles;
    const navigation = useNavigation();
    // console.log(waiting)
    if (waiting === undefined) {
        waiting = 0;
    }
    //modes
const theme=useContext(themeContext)
    // main function
    return (
        <Pressable style={[shopContainer,{backgroundColor:theme.shopBackground}]} onPress={
            () => {
                navigation.navigate('shopDetails', { email: email })
            }
        } >

            <View style={innerShopContainer}>
                <Image source={{ uri: image }} style={img} />
                {/* middle part */}
                <View style={middleDiv}>
                    <Text preset='title'>{name}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                        <Entypo name="location-pin" size={16} color={colors.orange} />
                        <Text preset='info'>{address}</Text>
                    </View>
                    {/* last row of middle div */}
                    <View style={info} >
                        <View style={avgTimeAndRatingContainer}>
                            {/* showing estimated time for waiting*/}
                            <FontAwesome5 name="business-time" size={14} color={colors.orange} />

                            {avgTime &&
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
                            {avg && <Text preset='info' style={ratingText}>{avg.toFixed(2)}</Text>}
                        </View>
                    </View>
                </View>
            </View>
            {/* bookmark icon | this is last half of SingleShop component horizontally*/}
            {
                (visibleIcon === true) &&
                (
                    cart.includes(email) ?
                        <Pressable
                            onPress={() => {
                                // setCartItems(items => items.filter(item => {
                                //     item._id !== _id
                                // }));
                                AsyncStorage.removeItem(email)
                                AsyncStorage.setItem('cart', JSON.stringify(cart.filter(email => email !== email)))
                                console.log(email, 'removed')
                            }
                            }
                            style={styles.bookmarkIcon}>
                            <MaterialCommunityIcons name="bookmark-minus" size={30} color={colors.darkOrange} />
                        </Pressable>
                        :
                        <Pressable
                            onPress={() => {
                                AsyncStorage.setItem('cart', JSON.stringify([...cart, email]))
                                console.log(email, 'added')
                            }}
                            style={styles.bookmarkIcon}>
                            <Ionicons name="bookmark-outline" size={26} color="black" />
                        </Pressable>
                )
            }
            {
                (deleteIcon === true) &&
                (
                    <Pressable
                        onPress={() => {
                            deleteShop(_id)
                            console.log(_id, 'deleted')
                        }}
                        style={[styles.bookmarkIcon, styles.deleteIcon]}>
                        <MaterialIcons name="delete-sweep" size={24} color="black" />
                    </Pressable>
                )

            }
        </Pressable >
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
        // backgroundColor: '#fff',
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
    deleteIcon: {
        alignSelf: 'center',
        marginRight: 20,
        padding: 5,
        borderColor: '#f5f4f2',
        borderWidth: 1,
    }

})