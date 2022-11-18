import { View, StyleSheet, Pressable, FlatList } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors';
import Text from '../../text/text';
import { catagoryList } from './CatagoryList';

export default function CatagoryTitle({ title, btn }) {
    const { headerContainer, textStyle, btnStyle, flatListContainer, activeCatagoryButton, catagoryButton, selectedItemText, normalItemText } = styles;
    // for finding which tab is selected and designe them accordingly 
    const [selectedItem, setSelectedItem] = React.useState('1'); //default selected all catagory

    return (
        <View>
            <View style={headerContainer}>
                <Text preset='title' style={textStyle}>{title}</Text>
                <Pressable onPress={() => console.log('See all Pressed')

                } style={{ padding: 10 }}>
                    <Text preset='title' style={btnStyle}>{btn}</Text>
                </Pressable>
            </View>
            <View style={flatListContainer}>
                <FlatList
                    data={catagoryList}
                    extraData={selectedItem} //it will rerender selected items
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    key={item => item.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => {
                            console.log(`Pressed in ${item.name}`)
                            setSelectedItem(item.id)
                        }
                        }
                            style={item.id === selectedItem ? activeCatagoryButton : catagoryButton}
                        >
                            <Text preset='title' style={item.id === selectedItem ? selectedItemText : normalItemText}>{item.name}</Text>
                        </Pressable>
                    )}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5,
        overflowY: 'scroll',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        marginVertical: 15,
        fontSize: 18,
        marginLeft: 5
    },
    btnStyle: {
        fontWeight: '800',
        color: colors.darkOrange
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
    }
})