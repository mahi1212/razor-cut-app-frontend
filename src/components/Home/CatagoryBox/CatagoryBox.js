import { View, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '../../../theme/spacing';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import Text from '../../Text/Text';
import { useNavigation } from '@react-navigation/native';

export default function CatagoryBox() {
    const { catagory, catagoryImage, singleCatagoryText, catagoryListStyle } = styles;
    const [catagories, setCatagories] = useState([]);

    const SingleCatagory = ({ text, icon }) => {
        const navigation = useNavigation()
        return (
            <View style={catagoryListStyle}>
                <Pressable onPress={() => {
                    // console.log(text)
                    navigation.navigate('CatagoryPage', { text })
                }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={catagoryImage} >
                        <Entypo name={icon} size={28} color={colors.orange} />
                    </View>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text preset='title' style={singleCatagoryText}>{text}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }
    const getCatagories = () => {
        // 192.168.0.122
        fetch('http://192.168.0.122:5000/services')
            .then((response) => response.json())
            .then((data) => {
                // setRefreshing(false);
                // let newdata = catagories.concat(data);
                setCatagories(data);
            })
            .catch((error) => {
                console.error(error);
            })
    };
    useEffect(() => {
        getCatagories();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={catagories}
                horizontal={true}
                contentContainerStyle={catagory}
                showsHorizontalScrollIndicator={false}
                key={item => item.id}
                renderItem={({ item }) => (
                    <SingleCatagory text={item.name} icon={item.icon} />
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    catagory: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing[2],
    },
    catagoryListStyle: {
        width: 90,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    singleCatagory: {
        width: 80,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
    },
    catagoryImage: {
        marginVertical: spacing[2],
        borderRadius: '50%',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FDF1DF",
    },
    singleCatagoryText: {
        marginTop: spacing[1],
        width: '100%',
    },
})