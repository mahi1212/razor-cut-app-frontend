import { Dimensions, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../components/Text/Text';
import { colors } from '../theme/colors';
import { useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import Catagories from '../components/ShopDetails/Catagory/Catagories';
import CatagoryTitle from '../components/Home/CatagoryTitle/CatagoryTitle';
import Members from '../components/ShopDetails/Members/Members';
import { catagoryList, details } from '../components/Home/CatagoryBox/CatagoryList';
import Image from 'react-native-image-progress';

const width = Dimensions.get('window').width;

export default function ShopDetails({ route }) {
    const [shop, setShop] = React.useState([])
    const [members, setMembers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [status, setStatus] = useState('About'); // for keeping status of tab
    const [data, setData] = useState([])
    console.log(data)
    const { shopId } = route.params;
    const getmembers = async () => {
        fetch(`http://192.168.0.221:5000/shops/${shopId}`)
            .then(res => res.json())
            .then(data => {
                setShop(data)
                setMembers(data.members)
                setIsLoading(false)
            })
    }
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
        getmembers()
        setStatusFilter(status);
    }, [])

    const setStatusFilter = status => {
        setIsLoading(true)
        if (status === 'About') {
            fetch(`http://192.168.0.221:5000/shops/${shopId}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.about)
                    setIsLoading(false)
                })
        } else if (status == 'Package') {
            fetch(`http://192.168.0.221:5000/shops/${shopId}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.package)
                    setIsLoading(false)
                })
        } else if (status == 'Gellary') {
            fetch(`http://192.168.0.221:5000/shops/${shopId}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.gellary)
                    setIsLoading(false)
                })
        } else {
            fetch(`http://192.168.0.221:5000/shops/${shopId}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.reviews)
                    setIsLoading(false)
                })
        }
    }

const { container, imageStyle, heading, line, flatListContainer, activeCatagoryButton, catagoryButton, selectedItemText, normalItemText } = styles;

const ScrollStatusBar = () => {
    return (
        <ScrollView horizontal={true} contentContainerStyle={flatListContainer} showsHorizontalScrollIndicator={false}>
            {
                details.map((item, index) => {
                    return (
                        <TouchableOpacity key={index}
                            style={item.status === status ? activeCatagoryButton : catagoryButton}
                            onPress={() => {
                                console.log(`Pressed in ${item.status}`)
                                setStatus(item.status)
                                setStatusFilter(item.status)
                            }
                            }
                        >
                            <Text preset='title' style={item.status === status ? selectedItemText : normalItemText}>{item.status}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}

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
            <View style={line} />
        </View>

        {/* details section */}
        <CatagoryTitle title='OUR DETAILS' />
        <ScrollStatusBar />
        <View style={{ marginHorizontal: 10 }}>
            {
                status === 'About' ?
                    <Text preset='info'>{data ? data : null}</Text>
                    : status === 'Package' ?
                        <Text preset='info'>{data ? data : null}</Text>
                        : status === 'Gellary' ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    data ? data.map((item, index) => {
                                        return (
                                            <Image key={index} source={{ uri: item.image }} style={{ width: width / 3, height: width / 3, margin: 5 }} />
                                        )
                                    }
                                    ) : null
                                }
                            </View>
                            : status === 'Review' ?
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        data ? (data.map((item, index) => {
                                            return (
                                                <View key={index} style={{ width: width / 2, height: 100, margin: 5, backgroundColor: 'white', borderRadius: 10, elevation: 5, padding: 10 }}>
                                                    <Text preset='h1'>{item.name}</Text>
                                                </View>
                                            )
                                        }
                                        )) : 'null'
                                    }
                                </View>
                                : null
            }

        </View>
        {/* members section */}
        <CatagoryTitle title='OUR TEAM MEMBERS' />
        <Members members={members} />
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
    line: {
        width: '97%',
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 10,
    },
    flatListContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    activeCatagoryButton: {
        width: 100,
        backgroundColor: colors.darkOrange,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: '50%',
        marginHorizontal: 3,
    },
    catagoryButton: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: '50%',
        marginHorizontal: 3,
        borderWidth: 1,
        borderColor: colors.darkOrange,
    },
    selectedItemText: {
        color: colors.white,
    },
    normalItemText: {
        color: colors.orange,
    },
})