import { Dimensions, FlatList, Linking, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text/Text';
import { colors } from '../../theme/colors';
import { useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import Catagories from '../../components/ShopDetails/Catagory/Catagories';
import CatagoryTitle from '../../components/Home/CatagoryTitle/CatagoryTitle';
import Members from '../../components/ShopDetails/Members/Members';
import { catagoryList, details } from '../../components/Home/CatagoryBox/CatagoryList';
import Image from 'react-native-image-progress';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

export default function ShopDetails({ route }) {
    const [shop, setShop] = React.useState([])
    const [members, setMembers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [status, setStatus] = useState('Booking'); // for keeping status of tab
    const [data, setData] = useState([])
    const [textData, setTextData] = useState('')
    // console.log(data)
    const { email } = route.params;
    const getmembers = () => {
        // 192.168.0.221
        fetch(`http://192.168.0.221:5000/shops/${email}`)
            .then(res => res.json())
            .then(data => {
                setShop(data)
                setMembers(data.members)
                setIsLoading(false)
            })
    }
    const getSingleShop = () => {
        setIsLoading(true)
        fetch(`http://192.168.0.221:5000/shops/${email}`)
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
        // http://192.168.0.221:5000
        if (status === 'About') {
            fetch(`http://192.168.0.221:5000/shops/${email}`)
                .then(res => res.json())
                .then(data => {
                    setTextData(data.about)
                    setIsLoading(false)
                })
        } else if (status == 'Package') {
            fetch(`http://192.168.0.221:5000/shops/${email}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.package)
                    setIsLoading(false)
                })
        } else if (status == 'Gellary') {
            fetch(`http://192.168.0.221:5000/shops/${email}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.gellary)
                    setIsLoading(false)
                })
        } else if (status == 'Review') {
            fetch(`http://192.168.0.221:5000/shops/${email}`)
                .then(res => res.json())
                .then(data => {
                    setData(data.review)
                    setIsLoading(false)
                })
        } else {
            fetch(`http://192.168.0.221:5000/appointment/${email}`)
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    setIsLoading(false)
                })
        }
    }

    const { container, imageStyle, heading, line, flatListContainer, activeCatagoryButton, catagoryButton, selectedItemText, normalItemText } = styles;
    const navigation = useNavigation();
    // status bar under our details
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
    // main code
    return (
        <ScrollView contentContainerStyle={container} showsVerticalScrollIndicator={false}>
            {/* back button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Entypo name='chevron-left' size={22} color={colors.darkOrange} />
            </TouchableOpacity>
            <Image source={{ uri: shop.image }} style={imageStyle} />
            {/* heading view */}
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
                {/* website, message, call etc section */}
                <Catagories shop={shop} />
                <View style={line} />
            </View>
            <View style={{ marginLeft: 5 }}>
                {/* members section */}
                <CatagoryTitle title='OUR TEAM MEMBERS' />
                <Members members={members} />
                {/* details section */}
                <CatagoryTitle title='OUR DETAILS' />
                <ScrollStatusBar />
                <View style={{ marginHorizontal: 10 }}>
                    {
                        status === 'About' ?
                            <Text preset='info' style={{ textAlign: 'justify', paddingHorizontal: 3, }}>{textData ? textData : null}</Text>
                            : status === 'Package' ?
                                <FlatList
                                    data={data}
                                    // horizontal={true}
                                    // showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center', padding: 7, borderWidth: .5, borderColor: '#EEEEEE', borderRadius: 35, marginRight: 5 }}>
                                                <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 25, overflow: 'hidden' }} />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text preset='title'>{item.name}</Text>
                                                    <Text preset='info' style={{ marginVertical: 10 }}>Time: {item.time} Hours</Text>
                                                    <Text preset='info' style={{ color: colors.darkOrange }}>Price: {item.price} ৳</Text>
                                                </View>
                                                {/* book button */}
                                                <Pressable onPress={
                                                    () => {
                                                        navigation.navigate('Booking', { shop: shop })
                                                    }
                                                } style={{ position: 'absolute', backgroundColor: colors.darkOrange, right: 30, bottom: 20, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
                                                    <Text style={{ fontSize: 18, color: 'white', }}>Book</Text>
                                                </Pressable>
                                            </View>
                                        )
                                    }}
                                />
                                : status === 'Gellary' ?
                                    <FlatList
                                        data={data}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}

                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ flexDirection: 'row', marginRight: 10, marginVertical: 10, justifyContent: 'space-around' }}>
                                                    <Image source={{ uri: item.image }} style={{ width: 110, height: 100, borderRadius: 5, overflow: 'hidden' }} />
                                                </View>
                                            )
                                        }
                                        }
                                    />
                                    : status === 'Review' ?
                                        <FlatList
                                            data={data}
                                            // horizontal={true}
                                            // showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ marginVertical: 10, alignItems: 'center', padding: 7, borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 5, marginRight: 5, width: '100%', alignItems: 'flex-start' }}>
                                                        <View style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'flex-start', width: '100%', flexDirection: 'row' }}>
                                                            <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 50, overflow: 'hidden' }} />
                                                            <View style={{width: '100%'}}>
                                                                <Text preset='title' style={{ marginLeft: 15 }}>{item.name}</Text>
                                                                <Text preset='info' style={{ marginTop: 5, marginLeft: 15 }}> {item.description}</Text>
                                                                <View style={{position: 'absolute', right: 70}}>
                                                                    {
                                                                        item?.rating === 5 ?
                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: -5, marginLeft: 15 }}>
                                                                                <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                            </View>
                                                                            : item.rating === 4 ?
                                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -5, marginLeft: 15 }}>
                                                                                    <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                    <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                    <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                    <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                </View>
                                                                                : item.rating === 3 ?
                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -5, marginLeft: 15 }}>
                                                                                        <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                        <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                        <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                    </View>
                                                                                    : item.rating === 2 ?
                                                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -5, marginLeft: 15 }}>
                                                                                            <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                            <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                        </View>
                                                                                        : item.rating === 1 ?
                                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 15 }}>
                                                                                                <AntDesign name='star' size={20} color={colors.darkOrange} />
                                                                                            </View>
                                                                                            : null
                                                                    }

                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        /> : status === 'Booking' ?
                                            <FlatList
                                                data={data}
                                                // horizontal={true}
                                                // showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View style={{ marginVertical: 10, alignItems: 'center', padding: 7, borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 5, marginRight: 5, width: '100%', alignItems: 'flex-start' }}>
                                                            <View style={{ marginLeft: 10, alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
                                                                <Text preset='title' style={{ marginVertical: 3 }}>Person: {item?.user_name}</Text>
                                                                <Text preset='info' style={{ marginVertical: 3 }}>Date: {item?.date}</Text>
                                                                <Text preset='info' style={{ marginVertical: 3 }}>Time: {item?.time}</Text>
                                                            </View>
                                                            <Text preset='info' style={{ marginTop: 15, marginLeft: 15, backgroundColor: colors.darkOrange, padding: 5, color: '#fff', borderRadius: 5, position: 'absolute', top: -5, right: 0 }}> STATUS: {item?.status}</Text>
                                                        </View>
                                                    )
                                                }}
                                            /> : null

                    }

                </View>
                {/* Details end & working hour starts here */}
                <CatagoryTitle title='WORKING HOURS' />
                <View style={{ marginHorizontal: 10 }}>
                    <View style={styles.iconAndText}>
                        <View style={styles.icon}>
                            <Entypo name='clock' size={20} color={colors.darkOrange} />
                        </View>
                        <Text style={styles.text} preset='info'>
                            Everyday {shop.workingHours}
                        </Text>
                    </View>
                </View>
                {/* working hour ends here */}
                {/* contact us */}
                <CatagoryTitle title='CONTACT US' />
                <View style={{ marginHorizontal: 10 }}>
                    <Pressable style={styles.iconAndText} onPress={() => Linking.openURL(`tel:${shop.phone}`)}>
                        <View style={styles.icon}>
                            <Entypo name='phone' size={20} color={colors.darkOrange} />
                        </View>
                        <Text style={{ fontSize: 18, color: colors.darkOrange }} preset='info'>
                            {shop.mobile}
                        </Text>
                    </Pressable>
                </View>
                {/* contact us ends here */}
                {/* location view start here */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CatagoryTitle title='OUR LOCATION' />
                    <Pressable onPress={
                        () => {
                            Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`)
                        }
                    }><Text style={{ marginHorizontal: 10, color: colors.darkOrange }}>FIND US ON MAP</Text></Pressable>
                </View>
                {/* map
                <MapView
                    style={{ width: 400, height: 200 }}
                    initialRegion={{
                        latitude: shop.latitude,
                        longitude: shop.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.02,
                    }}
                    showsUserLocation={true}
                >
                    <Marker
                        image={require('../../../assets/images/shop-marker.png')}
                        coordinate={{
                            latitude: shop.latitude,
                            longitude: shop.longitude,
                        }}
                        title={shop.name}
                        description={shop.address}
                    />
                </MapView> */}
                {/* Book now button orange color */}
                <Pressable onPress={() => {
                    navigation.navigate('Booking', { shop: shop })
                }}>
                    <View style={{ backgroundColor: colors.darkOrange, padding: 10, marginHorizontal: 5, borderRadius: 30, marginVertical: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Book Now</Text>
                    </View>
                </Pressable>
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
    backButton: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 10,
        left: 10,
        zIndex: 1,
        // backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
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