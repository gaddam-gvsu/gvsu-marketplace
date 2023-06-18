import React, { useContext } from "react";

import AddProduct from "../AddProduct";
import { AuthContext } from "../../utils/Context";
import Colors from "../../utils/Colors";
import Login from "../Login";
import ProductDetails from "../ProductDetails";
import ProductList from "../ProductList";
import { SplashScreen } from "../SplashScreen";
import UserProfile from "../UserProfile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      <Stack.Screen name="Products" component={ProductList} />
      <Stack.Screen name="Product Details" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Add Product" component={AddProduct} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name={`Profile - ${user.name}`} component={UserProfile} />
    </Stack.Navigator>
  );
};

const SignInStackNavigator = (options) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="GVSU Marketplace"
        component={Login}
        options={options}
      />
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
