import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Rating = (props) => {
    const [rating, setRating] = React.useState(0);

    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
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
});

export default Rating;
