import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../../components/Home/PageHeader/PageHeader';
import Rating from './Rating';

export default function Review({ route }) {
    const { email } = route.params;
    const [review, setReview] = React.useState('');
    console.log(review);

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
                    <Rating />
                    <TextInput style={styles.reviewInput}
                        placeholder="Write your review here"
                        onChangeText={(text) => {
                            setReview(text);
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Pressable style={styles.btn}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00000080' }}>Cancel</Text>
                        </Pressable>
                        <Pressable style={styles.btnSubmit}>
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