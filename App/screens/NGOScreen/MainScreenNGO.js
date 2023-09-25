import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AvailableScreenNGO from "./AvailableScreenNGO";
import TrackScreenNGO from "./TrackScreenNGO";
import IconButton from "../../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import AccountScreenNGO from "./AccountScreenNGO";

const Tab = createBottomTabNavigator();

export default function MainScreenNGO() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#50C878" },

      }}
    >
      <Tab.Screen
        name="Available Request"
        component={AvailableScreenNGO}
        options={{
          tabBarLabel: "Available",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Active Order Details"
        component={TrackScreenNGO}
        options={{
          tabBarLabel: "Track",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={35} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account Details"
        component={AccountScreenNGO}
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
