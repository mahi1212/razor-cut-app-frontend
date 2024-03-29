import { Alert, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text/Text'
import { StatusBar } from 'expo-status-bar'
import Picker from 'react-native-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { colors } from '../../theme/colors';
import axios from 'axios';

export default function UpdateShop() {
  // set all state of my shop
  const [shopName, setShopName] = useState('')
  const [shopEmail, setShopEmail] = useState('')
  const [shopimage, setShopimage] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [avgTime, setAvgTime] = useState('')
  const [workingHours, setWorkingHours] = useState('')
  const [about, setAbout] = useState('')
  const [status, setStatus] = React.useState("");
  const [Latitude, setLatitude] = useState('')
  const [Longitude, setLongitude] = useState('')

  const [berberName, setBerberName] = useState('')
  const [position, setPosition] = useState('')
  const [image, setImage] = useState('')
  const [berberName2, setBerberName2] = useState('')
  const [position2, setPosition2] = useState('')
  const [image2, setImage2] = useState('')

  const [packageName, setPackageName] = useState('')
  const [packagePrice, setPackagePrice] = useState('')
  const [packageTime, setPackageTime] = useState('')
  const [packageImage, setPackageImage] = useState('')

  const data = [
    { key: '1', value: 'Choose Any Catagory', disabled: true },
    { key: '2', value: 'Makeup' },
    { key: '3', value: 'Massage' },
    { key: '4', value: 'Haircut' },
    { key: '5', value: 'Home Visit' },
  ]
  const members = [
    { name: berberName, image: image, position: position },
    { name: berberName2, image: image2, position: position2 }
  ]
  const packages = [
    { name: packageName, price: packagePrice, time: packageTime, image: packageImage }
  ]
  const myData = {
    name: shopName,
    email: shopEmail,
    image: shopimage,
    mobile: mobile,
    address: shopAddress,
    street: streetAddress,
    latitude: Latitude,
    longitude: Longitude,
    website: website,
    avgTime: avgTime,
    status: status,
    workingHours: workingHours,
    members: members,
    about: about,
    package: packages,
    gellery: [],
    review: [],
  }
  // console.log(myData)
  const handleSubmit = () => {
    if (shopName === '' || shopEmail === '' || shopimage === '' || mobile === '' || shopAddress === '' || streetAddress === '' || Latitude === '' || Longitude === '' || website === '' || avgTime === '' || workingHours === '' || about === '') {
      Alert.alert('Please Fill All Fields')
    } else {
      updateShop()
      setFound(false)
    }

  }
  const updateShop = () => {
    axios.put(`http://172.20.10.2:5000/shops/${shopEmail}`, myData)
      .then(res => {
        console.log(res);
        alert('Shop Updated Successfully')
      }).catch(err => {
        alert(err)
      })
  }
  const [shop, setShop] = useState([]);
  const [found, setFound] = useState(false);
  // console.log(shop);
  const getShops = () => {
    if (shopEmail === '') {
      Alert.alert('Please Enter Shop Email')
    } else {
      fetch(`http://172.20.10.2:5000/shops/${shopEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setShop(data);
          // for toggle hiding and showing
          setFound(true);
        })
        .catch((err) => {
          if (err) {
            Alert.alert('Shop not found by given email!')
          }
        })
    }
  };

  // main function
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ position: 'relative' }}>
        <KeyboardAvoidingView >
          <View style={{ height: 230, paddingHorizontal: 10, alignItems: 'center', backgroundColor: '#000' }}>
            <Text preset='catagory' style={{ textAlign: 'center', textTransform: 'uppercase', marginVertical: 20, color: 'white' }}>Enter Shop Email You Want to update</Text>
            <TextInput placeholder='Shop Email' style={{ width: '100%', borderWidth: 1, borderColor: '#999', padding: 15, borderRadius: 5, backgroundColor: '#fff' }} onChangeText={(text) => { setShopEmail(text) }} />
            <TouchableOpacity style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5, marginTop: 15 }} onPress={() => getShops()}>
              <Text preset='title' style={{ textAlign: 'center', textTransform: 'uppercase', color: '#000' }}>Find Shop</Text>
            </TouchableOpacity>
          </View>
          {found ? <View style={{ padding: 10, marginTop: -10, backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
            <Text preset='catagory' style={styles.text}>Shop found! Update Details</Text>
            <TextInput placeholder='Shop Name' style={styles.input} onChangeText={(text) => { setShopName(text) }} />
            <TextInput placeholder='Shop Email' style={styles.input} onChangeText={(text) => { setShopEmail(text) }} />
            <TextInput placeholder='IMAGE URL' style={styles.input} onChangeText={(text) => { setShopimage(text) }} />
            <TextInput placeholder='Mobile Number' style={styles.input} onChangeText={(text) => { setMobile(text) }} />
            <TextInput placeholder='Shop Address (ex: Bondor)' style={styles.input} onChangeText={(text) => { setShopAddress(text) }} />
            <TextInput placeholder='Street Address (ex: Jail Road, House - 32/2, Bondor, Sylhet)' style={styles.input} onChangeText={(text) => { setStreetAddress(text) }} />
            {/* select shop type */}
            <View
              style={{ marginBottom: 10 }}
            >
              <SelectList
                setSelected={(val) => setStatus(val)}
                data={data}
                save="value"
                placeholder="Choose Any Catagory"
              />
            </View>
            <TextInput placeholder='Website' style={styles.input} onChangeText={(text) => { setWebsite(text) }} />
            <TextInput placeholder='Average waiting time' style={styles.input} onChangeText={(text) => { setAvgTime(text) }} />
            <TextInput placeholder='Working hours (ex: 10:00 AM - 11:00 PM)' style={styles.input} onChangeText={(text) => { setWorkingHours(text) }} />
            <TextInput placeholder='About' style={styles.input} onChangeText={(text) => { setAbout(text) }} />
            {/* berber details */}
            <Text preset='catagory' style={styles.text}>Input berber Details</Text>
            <View style={{ padding: 15 }}>
              <TextInput placeholder='Name' style={styles.input} onChangeText={(text) => { setBerberName(text) }} />
              <TextInput placeholder='Image' style={styles.input} onChangeText={(text) => { setImage(text) }} />
              <TextInput placeholder='Position' style={styles.input} onChangeText={(text) => { setPosition(text) }} />
              <View style={{ padding: 10 }} />
              <TextInput placeholder='Name' style={styles.input} onChangeText={(text) => { setBerberName2(text) }} />
              <TextInput placeholder='Image' style={styles.input} onChangeText={(text) => { setImage2(text) }} />
              <TextInput placeholder='Position' style={styles.input} onChangeText={(text) => { setPosition2(text) }} />
            </View>
            {/* package detils */}
            <Text preset='catagory' style={styles.text}>Input Package Details</Text>
            <View style={{ padding: 15 }}>
              <TextInput placeholder='Package name' style={styles.input} onChangeText={(text) => { setPackageName(text) }} />
              <TextInput placeholder='Package price' style={styles.input} onChangeText={(text) => { setPackagePrice(text) }} />
              <TextInput placeholder='Package time' style={styles.input} onChangeText={(text) => { setPackageTime(text) }} />
              <TextInput placeholder='Package Image' style={styles.input} onChangeText={(text) => { setPackageImage(text) }} />
            </View>
            <Text preset='catagory' style={styles.text}>Get it from - Google</Text>
            <TextInput placeholder='Latitude' style={styles.input} onChangeText={(text) => { setLatitude(text) }} />
            <TextInput placeholder='Longitude' style={styles.input} onChangeText={(text) => { setLongitude(text) }} />

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.title}>Update</Text>
            </TouchableOpacity>
          </View> : <View style={{ alignItems: 'center', padding: 10 }}>
            <Text >
              No shop available by given email!
            </Text>
          </View>}

        </KeyboardAvoidingView>
        <StatusBar style='auto' />
      </ScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    marginVertical: 10,
    color: '#999',
    textTransform: 'uppercase',
    fontSize: 16
  },
  btn: {
    backgroundColor: '#000',
    padding: 15,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16
  }
})