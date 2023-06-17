import AddProduct from "../AddProduct";
import CameraApp from "../Camera";
import Login from "../Login";
import ProductDetails from "../ProductDetails";
import ProductList from "../ProductList";
import React from "react";
import { SplashScreen } from "../SplashScreen";
import UserProfile from "../UserProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../../utils/Colors";

const Stack = createNativeStackNavigator();
const headerOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Home" component={ProductList} />
      <Stack.Screen name="Product Details" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Add Product" component={AddProduct} />
      <Stack.Screen name="Camera" component={CameraApp} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Profile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const SignInStackNavigator = (options) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GVSU Marketplace" component={Login} options={options} />
    </Stack.Navigator>
  );
};

const SplashStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export {
  SignInStackNavigator,
  SplashStackNavigator,
  MainStackNavigator,
  ProductStackNavigator,
  ProfileStackNavigator,
};
