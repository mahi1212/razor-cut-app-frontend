import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'

import Swiper from 'react-native-swiper'
import { colors } from '../../../theme/colors'
import Text from '../../text/text'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: colors.darkOrange,
        marginTop: 20,
        height: 200,
        position: 'relative',
    },
    slide: {
        justifyContent: 'center',
        height: '100%',
        alignItems: 'start',
        paddingHorizontal: 20,
    },
})
const Slider = ({ percent, title, subTitle }) => {
    return (
        <View style={styles.slide}>
            <Text preset='info' style={{ color: colors.white, fontSize: 16 }}>
                {percent}Off
            </Text>
            <Text preset='h1' style={{ color: colors.white, marginVertical: 15, }}>
                {title}
            </Text>
            <Text preset='info' style={{ color: colors.white, width: 250, fontSize: 16 }}>
                {subTitle}
            </Text>
            <Text preset='h1' style={{ position: 'absolute', top: 25, right: 25, fontSize: 46, color: colors.white }}>
                {percent}
            </Text>
        </View>
    )
}
export default class SwiperComponent extends Component {
    render() {
        const { container, wrapper } = styles
        return (
            <View style={container}>
                <Swiper style={wrapper}
                    activeDotStyle={{
                        backgroundColor: colors.white,
                        width: 20,
                        marginBottom: -20,
                        borderRadius: 10,
                    }} dotStyle={{
                        backgroundColor: '#EEEEEE',
                        width: 8,
                        marginBottom: -20,
                        borderRadius: 30,
                    }}>
                    <View>
                        <Slider percent="20%" title="Todays's Special" subTitle="get a discount on your order! Only valid for today" />
                    </View>
                    <View >
                        <Slider percent="10%" title="Welcome Bonus" subTitle="Let's make a bonding with us! we care about you!" />
                    </View>
                    <View >
                        <Slider percent="30%" title="OMG Offer" subTitle="Use our app for six months to get upto 30% off" />
                    </View>
                </Swiper>

            </View>
        )
    }
}
