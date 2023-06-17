import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const ShowMap = ({ location, city, region }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ ...location }}
          title={city}
          description={region}
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ShowMap;
