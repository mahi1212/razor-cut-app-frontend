import { View, Text } from 'react-native'
import React from 'react'

export default function Review({ route }) {
    const { email } = route.params;
    console.log(email)
    return (
        <View>
            <Text>Review</Text>
        </View>
    )
}