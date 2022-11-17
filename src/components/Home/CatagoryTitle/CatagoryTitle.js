import { View, StyleSheet, Pressable, FlatList } from 'react-native'
import React from 'react'
import { colors } from '../../../theme/colors';
import Text from '../../text/text';
import { catagoryList } from './CatagoryList';

export default function CatagoryTitle({ title, btn }) {
    const { headerContainer, textStyle, btnStyle, flatListContainer, activeCatagoryButton, catagoryButton, selectedItemText, normalItemText } = styles;
    // for finding which tab is selected and designe them accordingly 
    const [selectedItem, setSelectedItem] = React.useState('1'); //default selected all catagory

    const handleSelection = (id) => {
        setSelectedItem(id)
    }

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
        marginTop: 5,
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
    },
    btnStyle: {
        fontWeight: '800',
        color: colors.darkOrange
    },
    activeCatagoryButton: {
        width: 95,
        backgroundColor: colors.darkOrange,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: '50%',
        marginRigth: 15,
    },
    catagoryButton: {
        width: 100,
        marginRigth: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: '50%',
        marginHorizontal: 5,
        borderColor: colors.darkOrange,
        borderWidth: 1,
    },
    selectedItemText: {
        color: colors.white,
    },
    normalItemText: {
        color: colors.orange,
    }
})