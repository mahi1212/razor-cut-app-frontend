import { View, Text, StyleSheet, Image, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../components/Home/PageHeader/PageHeader';
import axios from 'axios';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../navigation';

export default function Review({ route }) {
    const { email } = route.params;
    const [name, setName] = React.useState(null);
    const [userEmail, setUserEmail] = React.useState(null);
    const [photoUrl, setPhotoUrl] = React.useState(null);
    const [rating, setRating] = React.useState(0);
    const [description, setDescription] = React.useState('');

    const data = {
        rating: rating,
        name: name,
        image: photoUrl,
        description: description
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });
    }, []);

    // Get user data
    const getUser = () => {
        axios.get(`http://192.168.0.221:5000/users/${userEmail}`)
            .then((res) => {
                // console.log(res.data);
                setPhotoUrl(res.data.photoUrl);
                setName(res.data.name);
            });
    };
    getUser();
    // submit review
    const submitReview = () => {
        if(rating == 0){
            Alert.alert("Please rate the shop");
            return;
        }
        if(description == ''){
            Alert.alert("Please write your review");
            return;
        }
        axios.post(`http://192.168.0.221:5000/shops/review/${email}`, data).then((res) => {
            if (res.data) {
                Alert.alert("Review Added Successfully");
            }
        });

    }
    console.log(data);
    // reset form
    const reset = () => {
        setRating(0);
        setDescription('');
        // clear text input
    }

    return (
        <SafeAreaView >
            <PageHeader title="Review" />
            <View style={styles.container}>
                <View style={styles.popUp}>
                    <Image
                        source={require("../../../assets/images/rating.gif")}
                        style={{ width: 200, height: 200, }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00000080' }}>Share your experience!</Text>
                    {/* rating */}
                    <View style={styles.containerRating}>
                        <Text style={styles.text}>Rating </Text>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => setRating(ratingValue)}>
                                    <Text style={ratingValue <= rating ? styles.selectedStar : styles.unselectedStar}>
                                        {'\u2606'}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        <Text style={styles.text}> {rating}/5 </Text>
                    </View>
                    {/* review text */}
                    <TextInput style={styles.reviewInput}
                        placeholder="Write your review here"
                        // onChangeText={(text) => {
                        //     setDescription(text);
                        // }}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Pressable style={styles.btn} onPress={
                            () => {
                                reset();
                            }
                        }>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00000080' }}>Cancel</Text>
                        </Pressable>
                        <Pressable style={styles.btnSubmit} onPress={
                            () => {
                                submitReview();
                            }
                        }>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00000080' }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    popUp: {
        width: '99%',
        height: 550,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // rating
    containerRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        marginRight: 5,
        color: '#00000080',
    },
    selectedStar: {
        color: '#FFC107',
        fontSize: 30,
    },
    unselectedStar: {
        color: '#D3D3D3',
        fontSize: 30,
    },
    reviewInput: {
        width: '100%',
        height: 100,
        backgroundColor: '#00000005',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00000010',
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    btn: {
        width: '45%',
        height: 50,
        borderWidth: 1,
        borderColor: '#00000010',
        backgroundColor: '#00000005',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSubmit: {
        width: '45%',
        height: 50,
        backgroundColor: '#FFC107',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

});