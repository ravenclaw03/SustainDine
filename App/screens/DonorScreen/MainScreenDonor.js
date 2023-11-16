import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewScreenDonor from "./NewScreenDonor";
import TrackScreenDonor from "./TrackScreenDonor";
import IconButton from "../../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import AccountScreenDonor from "./AccountScreenDonor";


const Tab = createBottomTabNavigator();

export default function MainScreenDonor({ route }) {
  const { name } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "orange" },
      }}
    >
      <Tab.Screen
        name="New Request"
        component={NewScreenDonor}
        options={{
          tabBarLabel: "New",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={28} color={color} />
          ),
        }} />
      <Tab.Screen
        name="Active Order Details"
        component={TrackScreenDonor}
        options={{
          tabBarLabel: "Track",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={35} color={color} />
          ),
        }} />
      <Tab.Screen
        name="Account Details"
        component={AccountScreenDonor}
        initialParams={{ data: name }}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={30} color={color} />
          ),
        }}/> 
      

    </Tab.Navigator>
  );
}
