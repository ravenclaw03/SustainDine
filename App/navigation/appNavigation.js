import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreenDonor from '../screens/DonorScreen/MainScreenDonor';
import MainScreenNGO from '../screens/NGOScreen/MainScreenNGO';
import MainScreenDP from '../screens/DeliveryPersonScreen/MainScreenDP';
import EditInfoScreenDP from '../screens/DeliveryPersonScreen/EditInfoScreenDP';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />   

        <Stack.Screen name="Donor" options={{headerShown: false}} component={MainScreenDonor} />    
        <Stack.Screen name="NGO" options={{headerShown: false}} component={MainScreenNGO} /> 
        <Stack.Screen name="DP" options={{headerShown: false}} component={MainScreenDP} />   
      </Stack.Navigator>
    </NavigationContainer>
  )
}