import * as React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import InputAuto from "../../components/MapComponent/InputAuto";

const { width, height } = Dimensions.get("window");

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
          title={"title"}
          description={"this"}
        />
      </MapView>

      {/* //searh destinatio */}

      <View style={styles.searchContainer}>
        <Text>origin</Text>
        <InputAuto onPlaceSelected ={()=>{}}/>
        <Text>destination</Text>
        <InputAuto onPlaceSelected ={()=>{}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    padding: 8,
    top: 2,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4,
    borderRadius: 8,
  },
});
