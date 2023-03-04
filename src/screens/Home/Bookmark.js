import { View, Pressable, FlatList, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Home/PageHeader/PageHeader';
import Text from '../../components/Text/Text';
import { colors } from '../../theme/colors';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Image from 'react-native-image-progress';
import { Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Bookmark({ route }) {
    // const { cart } = route.params;
    const [cart, setCart] = useState([]);
    // console.log(cart);
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

    const [cartItems, setCartItems] = useState([]);
    // console.log(cartItems);
    // taking all cart items and fetching data by their id from database then mapping them for rendering
    const fetchData = () => {
        cart.map(email => {
            // 192.168.0.121
            // console.log(id)
            fetch(`http://192.168.68.228:5000/shops/${email}`)
                .then(res => res.json())
                .then(data => {
                    // setCartItems(data)
                    setCartItems(prev => [...prev, data])
                }
                )
        })
    }
    const navigation = useNavigation();

    return (
        <View style={{ marginHorizontal: 5, flex: 1 }} onLayout={fetchData}>
            <PageHeader title="My Bookmarks" />
            {   // if cartItems is not empty then render the FlatList
                cartItems.length !== 0 ?
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const { shopImage, shopContainer, shopRating, shopInfo } = styles;
                            const { _id, email } = item;
                            var sum = item.review.reduce((total, review) => total + review.rating, 0);
                            if (sum === 0) { item.review.length = 1 }
                            var average = sum / item.review.length;
                            if(item.waiting === undefined) {
                                item.waiting = 0;
                            }
                            const estimatedTime = item.waiting * item.avgTime
                            return (
                                <Pressable onPress={
                                    () => {
                                        navigation.navigate('shopDetails', { shopId: _id })
                                    }
                                } style={shopContainer}>
                                    <Image source={{ uri: item.image }} style={shopImage} />
                                    <View style={shopInfo}>
                                        <Text preset='title' style={{ color: colors.black }}>{item.name}</Text>
                                        <View style={shopRating}><Entypo name='location' color={'red'} /><Text preset='h2' style={{ color: colors.info, marginVertical: 10, marginHorizontal: 5 }}>{item.address}</Text></View>
                                        { average && <View style={shopRating}>
                                            <FontAwesome name="star" size={14} color={'red'} />
                                            <Text preset='h2' style={{ color: colors.darkOrange, marginHorizontal: 5 }}>{average.toFixed(2)} </Text>
                                        </View>}
                                    </View>
                                    {/* avg waiting time */}
                                    <View>
                                        <Text preset='h2' style={{ position: 'absolute', left: 0, bottom: 20, alignItems: 'center' }}>Estimated Time : { estimatedTime } Min</Text>
                                    </View>
                                    {/* delete button */}
                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                        <Pressable onPress={() => {
                                            Alert.alert(
                                                "Remove shop",
                                                "Are you sure to remove?",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed", email),
                                                        style: "cancel"
                                                    },
                                                    {
                                                        text: "OK", onPress: () => {
                                                            setCartItems(
                                                                // delete cartItem from cart
                                                                cartItems.filter(item => item.email !== email)
                                                            );
                                                            AsyncStorage.setItem('cart', JSON.stringify(cart.filter(e => e !== email)))
                                                        }
                                                    }
                                                ]
                                            );
                                        }}
                                            style={{ backgroundColor: 'orange', padding: 10, width: '50%', alignItems: 'center' }}
                                        >
                                            <Ionicons name="trash-outline" size={24} color="white" />
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            Linking.openURL(`tel:${item.mobile}`)
                                        }}
                                            style={{ backgroundColor: 'green', padding: 10, width: '50%', alignItems: 'center' }}
                                        >
                                            <Ionicons name="ios-call" size={24} color="white" />
                                        </Pressable>

                                    </View>
                                    <View style={{ position: 'absolute', right: 60, bottom: 90, alignItems: 'center' }}>
                                        <MaterialCommunityIcons name="timer-outline" size={40} color="black" />
                                        <Text preset='h2' style={{ color: 'red', position: 'absolute', bottom: 15, fontSize: 18, backgroundColor: 'white', paddingHorizontal: 2, borderRadius: '50%', }}>{item.waiting}</Text>
                                        <Text preset='h2' style={{ paddingHorizontal: 5 }}>in waiting</Text>
                                    </View>
                                </Pressable>
                            )
                        }
                        }
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text preset='h2' style={{ color: colors.darkOrange }}>NO BOOKMARKS</Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    shopImage: {
        width: 500,
        height: 200,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginRight: 10,
    },
    shopInfo: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 10,
        borderTopEndRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    shopRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopContainer: {
        overflow: 'hidden',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#F7F9FC',
        width: '90%',
        alignSelf: 'center',
    },
    buttons: {
        width: `100%`,
        borderBottomRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },


})