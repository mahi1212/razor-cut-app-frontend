import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import Text from '../../components/Text/Text';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function UpdatePage({ route }) {
    const { type, email } = route.params;
    // console.log(type, email)
    const navigation = useNavigation();
    const [website, setWebsite] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [offer, setOffer] = React.useState(null);
    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitutde] = React.useState(null);
    // update website
    const updateWebsite = () => {
        if (website === null) {
            alert('Please enter address');
            return;
        }
        if (website.includes('.') === false) {
            alert('Enter valid website address');
            return;
        }
        // console.log(website)
        const data = {
            website: website
        }
        axios.put(`http://172.20.10.2:5000/shopss/${email}`, data)
            .then(res => {
                // console.log(res);
                alert('WEBSITE UPDATED SUCCESSFULLY')
            }).catch(err => {
                alert(err)
            })
        navigation.navigate('Home')

    }
    // update phone
    const updatePhone = () => {
        if( phone.length !== 11 || phone.includes('017' || '016' || '013' || '019' || '018') == false){ 
            alert('INVALID PHONE NUMBER')
            return;
        }
        const data = {
            mobile: phone
        }
        axios.put(`http://172.20.10.2:5000/shopss/${email}`, data)
            .then(res => {
                console.log(res);
                alert('PHONE UPDATED SUCCESSFULLY')
            }).catch(err => {
                alert(err)
            })
        navigation.navigate('Home')
    }
    // update location
    const updateLocation = () => {
        console.log(latitude, longitude)
        const data = {
            latitude: latitude,
            longitude: longitude
        }
        axios.put(`http://172.20.10.2:5000/shopss/${email}`, data)
            .then(res => {
                console.log(res);
                alert('OFFER UPDATED SUCCESSFULLY')
            }).catch(err => {
                alert(err)
            })
        navigation.navigate('Home')
    }
    // update offer
    const updateOffer = () => {
        console.log(offer)
        const data = {
            offer: offer
        }
        axios.put(`http://172.20.10.2:5000/shopss/${email}`, data)
            .then(res => {
                console.log(res);
                alert('OFFER UPDATED SUCCESSFULLY')
            }).catch(err => {
                alert(err)
            })
        navigation.navigate('Home')
    }
    
    return (
        <View style={styles.container}>
            {/* for websites */}
            {
                type === 'website' &&
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text>UPDATE WEBSITE</Text>
                    <TextInput
                        placeholder='Enter data here'
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setWebsite(text);
                        }}
                    />
                    <Pressable onPress={() => {
                        updateWebsite();
                    }} style={{ backgroundColor: '#000', padding: 10, marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Update</Text>
                    </Pressable>
                </View>
            }
            {/* for phone */}
            {
                type === 'phone' &&
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text>UPDATE PHONE</Text>
                    <TextInput
                        placeholder='Enter data here'
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setPhone(text);
                        }}
                    />
                    <Pressable onPress={() => {
                        updatePhone();
                    }} style={{ backgroundColor: '#000', padding: 10, marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Update</Text>
                    </Pressable>
                </View>
            }
            {/* for offer */}
            {
                type === 'offer' &&
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text>UPDATE OFFER</Text>
                    <TextInput
                        placeholder='Enter data here'
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setOffer(text);
                        }}
                    />
                    <Pressable onPress={() => {
                        updateOffer();
                    }} style={{ backgroundColor: '#000', padding: 10, marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Update</Text>
                    </Pressable>
                </View>
            }
            {/* for location */}
            {
                type === 'location' &&
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text>UPDATE LOCATION</Text>
                    <TextInput
                        placeholder='Enter latitude data here'
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setLatitude(text);
                        }}
                    />
                    <TextInput
                        placeholder='Enter longitude data here'
                        style={styles.inputField}
                        onChangeText={(text) => {
                            setLongitutde(text);
                        }}
                    />
                    <Pressable onPress={() => {
                        updateLocation();
                    }} style={{ backgroundColor: '#000', padding: 10, marginTop: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Update</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        borderWidth: 1,
        width: '90%',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    }
})