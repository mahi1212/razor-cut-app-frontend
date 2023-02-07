import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text/Text'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'

export default function MyBookings() {
    
    return (
        <ScrollView style={{ flex: 1 }}>
            <Text preset="catagory" style={styles.headerText} > Let's See History </Text>
            {/* card with shadow for shop previously booked */}
            <View style={{ backgroundColor: colors.white, marginHorizontal: spacing[4], borderRadius: 10, padding: spacing[4], marginVertical: spacing[4], borderWidth: 1, borderColor: "#ccc" }}>
                <Text preset="title" style={{ color: colors.darkOrange, fontWeight: 'bold' }}> Shop Name </Text>
                <Text preset="title" style={{ color: colors.darkOrange, fontWeight: 'bold' }}> Date </Text>
                <Text preset="title" style={{ color: colors.darkOrange, fontWeight: 'bold' }}> Time </Text>
                <Text preset="title" style={{ color: colors.darkOrange, fontWeight: 'bold' }}> Status </Text>
            </View>
            {/* card with shadow for shop previously booked */}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkOrange,
        marginVertical: spacing[3],
        paddingVertical: spacing[3],
    },
})