import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

const Stack = createNativeStackNavigator();
const Products = () => (
    <Stack.Navigator
        mode="modal"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen
            name={'Product List'}
            component={ProductList}
        />
        <Stack.Screen
            name="Product Details"
            component={ProductDetails}
        />
    </Stack.Navigator>
);

export default Products;