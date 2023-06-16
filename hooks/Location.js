import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      const reverseGeo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setLocation({latitude, longitude, city: reverseGeo[0].city, state: reverseGeo[0].region});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
