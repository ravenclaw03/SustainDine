import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AvailableScreenDP from "./AvailableScreenDP";
import TrackScreenDP from "./TrackScreenDP";
import IconButton from "../../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import AccountScreenDP from "./AccountScreenDP";

const Tab = createBottomTabNavigator();

export default function MainScreenDP() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0096FF" },

      }}
    >
      <Tab.Screen
        name="Available Request"
        component={AvailableScreenDP}
        options={{
          tabBarLabel: "Available",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Active Order Details"
        component={TrackScreenDP}
        options={{
          tabBarLabel: "Track",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={35} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account Details"
        component={AccountScreenDP}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
