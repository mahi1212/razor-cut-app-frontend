import { Button, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '../theme/spacing'
import { colors } from '../theme/colors'
import MapView, { Marker, } from 'react-native-maps'
import * as Location from 'expo-location';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { SearchBar } from 'react-native-screens'
import Search from '../components/Home/Search/Search'

export default function Explore() {
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [location, setLocation] = React.useState(null)
  const [errorMsg, setErrorMsg] = React.useState(null)
  // console.log(location)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // it difines how much you can zoom in map view
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0442,
      })
    })();
  }, []);

  const [shops, setShops] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    // if (text) {
    //   // Inserted text is not blank
    //   // Filter the masterDataSource
    //   // Update FilteredDataSource
    //   const newData = data.filter(function (item) {
    //     const itemData = item.title
    //       ? item.title.toUpperCase()
    //       : ''.toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //   });
    //   console.log(newData)
    //   // setFilteredDataSource(newData);
    //   setSearchText(text);
    // }
  }
  const getShops = () => {
    setIsLoading(true)
    fetch(`http://192.168.0.121:5000/shops`)
      .then(res => res.json())
      .then(data => {
        setShops(data)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getShops();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[1] }}>
      {/* select shop address in map and return to this */}
      {
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation={true}
          showsCompass={true}
          showsScale={true}
        >
          {shops && shops.map((item, index) => (
            <Marker
              key={index}
              // image={{uri: item.image}}
              image={require('../../assets/images/shop-marker.png')}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.name}
              description={item.address}
            // 
            // onPress={() => {
            //   Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`)
            // }}

            />
          ))}
          <Marker
            image={require('../../assets/images/user-marker.png')}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}

            title="You are here"
          />
          {/* show direaction to selected place */}
          {/* <MapViewDirections
    origin={region}
    destination={selectedShop} //here will be selected place by user
    apikey={GOOGLE_MAPS_APIKEY} //we have no api key so it will not work
    strokeWidth={3}
    strokeColor="hotpink"
  /> */}

        </MapView>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})