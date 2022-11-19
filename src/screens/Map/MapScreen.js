import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 24.726236;
const LONGITUDE = 91.756729;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function MapScreen() {
  return (
    <View style={styles.container}>
   <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        customMapStyle
      >
        <Marker
          draggable
          coordinate={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
          }}
          onDrag={(e) => alert(JSON.stringify.apply(e.nativeEvent.coordinate))}
          title={"Tb Gate"}
          description={"NHF, Tb Gate"}
        />
      </MapView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
        // flex: 1,

    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
