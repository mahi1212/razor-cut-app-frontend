import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import React from 'react'
import Text from '../../components/Text/Text';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ChangeStatus({ route }) {
    const [status, setStatus] = React.useState(null);
    const data = route.params.item;
    // console.log(data);
    const navigation = useNavigation();
    const updateStatus = () => {
        if(status === null) {
            alert('Please enter status');
            return;
        }
        // update status
        axios.put(`http://192.168.0.221:5000/status/${data._id}`, { status: status })
            .then(response => {
                console.log(response.data);
                alert('Status Updated');
                navigation.goBack();
            })
    }

    return (
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {data && <Text preset='h2'>CURRENT STATUS : {data.status.toUpperCase()}</Text>}
            <TextInput
                placeholder='Enter Status here. Ex: pendin or visited'
                style={styles.inputField}
                onChangeText={(text) => {
                    setStatus(text);
                }}
            />
            <Pressable onPress={() => {
                updateStatus();
            }} style={{ backgroundColor: '#000', padding: 10, marginTop: 10, borderRadius: 5 }}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Update</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    inputField: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 20,
        padding: 10,
    }
});