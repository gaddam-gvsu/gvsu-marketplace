import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import AddProduct from "../screens/AddProduct";
import colors from "../utils/Colors";
import Products from "./Products";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={"Products"}
        component={Products}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"AddProduct"}
        component={AddProduct}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
              <View style={styles.container}>
                <Feather name="plus-circle" color={colors.white} size={30} />
              </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" color={color} size={size} />
          ),
        })}
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

export default Home;
