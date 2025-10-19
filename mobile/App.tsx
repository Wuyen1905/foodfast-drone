import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Menu from './src/screens/Menu';
import Details from './src/screens/Details';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
import Drone from './src/screens/Drone';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Drone" component={Drone} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


