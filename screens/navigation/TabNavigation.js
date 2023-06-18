import * as Location from "expo-location";

import { AuthContext, LocationContext } from "../../utils/Context";
import {
  MainStackNavigator,
  ProductStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigation";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { DefaultTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "../../utils/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { useState } from "react";

const Tab = createBottomTabNavigator();

const CustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Feather name="plus-circle" color={colors.white} size={30} />
      </View>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
    } catch (e) {
      console.log("Location Error", e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{location}}>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Product Nav"
        component={ProductStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" color={color} size={size} />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </LocationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 70,
    width: 70,
    borderRadius: 35,
    bottom: 35,
    borderColor: colors.white,
    borderWidth: 10,
  },
  navigation: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.white,
    },
  },
});

export default BottomTabNavigator;
