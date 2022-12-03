import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '../theme/spacing'
import { colors } from '../theme/colors'
import MapView, { Marker, } from 'react-native-maps'
import * as Location from 'expo-location';

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
        // it difines how much you can zoom map view
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0442,
      })
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: spacing[1] }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
      >
        <Marker
          coordinate={region}
          title={"name"}
          description={"address"}
        />
      </MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})