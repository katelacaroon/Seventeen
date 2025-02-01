import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './landing';
import Tracks from './tracks';
import AboutScreen from './about';


const Stack = createStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}  // Hide the header for login screen
        />
        <Stack.Screen
          name="Tracks"
          component={Tracks}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}  // Hide the header for landing screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;