import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Text from '../../components/Text/Text';

const Dropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setIsOpen(false);
        onSelect(option);
    };

    // main function
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
                <Text preset='title' style={{ marginTop: -80, padding: 5, borderWidth: 1 }}>SELECT HOW MANY PEOPLE WAITING?</Text>
            </TouchableOpacity>
            {/* ANIMATION SETTING AS SLIDE */}
            <Modal visible={isOpen} animationType="slide">
                <FlatList
                    contentContainerStyle={style.list}
                    data={options}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={style.btn} onPress={() => handleSelect(item)}>
                            <Text style={{ textAlign: 'center' }}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />
            </Modal>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        marginTop: 100,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    btn: {
        width: 300,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center',
    }
});
export default Dropdown;
