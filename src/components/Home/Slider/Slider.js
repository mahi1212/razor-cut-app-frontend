import React, { Component } from 'react'
import { StyleSheet, View, Image, ImageBackground } from 'react-native'

import Swiper from 'react-native-swiper'
import { colors } from '../../../theme/colors'
import Text from '../../Text/Text'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        height: 200,
        position: 'relative',
    },
    slide: {
        justifyContent: 'center',
        height: '100%',
        alignItems: 'start',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
})
const Slider = ({ percent, title, subTitle, backgroundImage }) => {
    return (
        <ImageBackground source={{ uri: backgroundImage }} style={[styles.slide, { borderRadius: 10, overflow: 'hidden' }]} >
            <Text preset='info' style={{ color: colors.black, fontSize: 16 }}>
                {percent}Off
            </Text>
            <Text preset='h1' style={{ color: colors.black, marginVertical: 15, }}>
                {title}
            </Text>
            <Text preset='info' style={{ color: colors.black, width: 250, fontSize: 16 }}>
                {subTitle}
            </Text>
        </ImageBackground>
    )
}
// main component
export default class SwiperComponent extends Component {
    render() {
        const { container } = styles
        return (
            <View style={container}>
                <Swiper
                    loop={true}
                    autoplayDirection={true}
                    autoplay={true}
                    activeDotStyle={{
                        backgroundColor: colors.darkOrange,
                        width: 20,
                        marginBottom: -20,
                        borderRadius: 10,
                    }} dotStyle={{
                        backgroundColor: '#ccc',
                        width: 8,
                        marginBottom: -20,
                        borderRadius: 30,
                    }}>
                    <View >
                        <Slider percent="30%" title="OMG Offer" subTitle="Use our app for six months to get upto 30% off" backgroundImage='https://t3.ftcdn.net/jpg/03/46/05/46/240_F_346054648_MgrwaieTMqOEMcApZThjvt6PsyUC5oYH.jpg' />
                    </View>
                    <View>
                        <Slider percent="20%" title="Todays's Special" subTitle="get a discount on your order! Only valid for today" backgroundImage='https://t4.ftcdn.net/jpg/02/76/79/81/360_F_276798195_AbKgQIAQcq21nkumNb7KoVef8GQXoeEo.jpg'/>
                    </View>
                    <View >
                        <Slider percent="10%" title="Welcome Bonus" subTitle="Let's make a bonding with us! we care about you!" backgroundImage='https://t3.ftcdn.net/jpg/01/28/40/94/360_F_128409476_MjNDWNfvtj4itt1Xn0kxDm4b16G1bepn.jpg' />
                    </View>
                </Swiper>

            </View>
        )
    }
}
