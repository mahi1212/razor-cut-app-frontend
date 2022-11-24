import { View, Pressable, FlatList, StyleSheet, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '../components/Home/PageHeader/PageHeader';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { Entypo, FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function Bookmark({ route }) {
    const { cart } = route.params;
    // console.log(cart)
    const [cartItems, setCartItems] = useState([]);
    // console.log(cartItems);
    // taking all cart items and fetching data by their id from database then mapping them for rendering
    useEffect(() => {
        cart.map(id => {
            // console.log(id)
            fetch(`http://192.168.0.221:5000/shops/${id}`)
                .then(res => res.json())
                .then(data => {
                    // setCartItems(data)
                    setCartItems(prev => [...prev, data])
                }
                )
        })
    }, [])

    return (
        <View style={{ marginHorizontal: 5, flex: 1 }}>
            <PageHeader title="Bookmarks" />
            {   // if cartItems is not empty then render the FlatList
                cartItems && <FlatList
                    data={cartItems}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        const { shopImage, shopContainer, shopRating, shopInfo } = styles;
                        const { _id } = item;
                        return (
                            <Pressable style={shopContainer}>
                                <Image source={{ uri: item.image }} style={shopImage} />
                                <View style={shopInfo}>
                                    <Text preset='title' style={{ color: colors.black }}>{item.name}</Text>
                                    <Text preset='h2' style={{ color: colors.info, marginVertical: 10 }}><Entypo name='location-pin' color={'red'} style={{ marginRight: 10 }} />{item.address}</Text>
                                    <View style={shopRating}>
                                        <FontAwesome name="star" size={14} color={'green'} />
                                        <Text preset='h2' style={{ color: colors.darkOrange, marginHorizontal: 5 }}>{item.rating.reduce((a, b) => a + b) / item.rating.length}</Text>
                                    </View>
                                </View>
                                {/* delete button */}
                                <Pressable onPress={() => {
                                    console.log(cartItems, 'removed')
                                    Alert.alert(
                                        "Remove shop",
                                        "Are you sure to remove?",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            {
                                                text: "OK", onPress: () => {
                                                    setCartItems((items) => items.filter(item => item._id !== _id));
                                                }
                                            }
                                        ]
                                    );
                                }}
                                    style={{ backgroundColor: 'red', padding: 10, marginRight: 10, borderRadius: 10 }}>
                                    <Ionicons name="trash-outline" size={24} color="white" />
                                </Pressable>
                            </Pressable>
                        )
                    }
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    shopImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginRight: 10,

    },
    shopInfo: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 10,
        // backgroundColor: 'green',
        elevation: 1,
        borderRadius: 10,
    },
    shopRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    }

})