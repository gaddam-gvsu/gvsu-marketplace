import {
  MainStackNavigator,
  ProductStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigation";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../App";
import { DefaultTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "../../utils/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
  const { user, signOut } = useContext(AuthContext);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Main Nav"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Product Nav"
        component={ProductStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" color={color} size={size} />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name={user.given_name}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
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
