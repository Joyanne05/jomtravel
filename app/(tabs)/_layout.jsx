import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="black" /> //Focused
            ) : (
              <Ionicons name="home-outline" size={24} color="black" /> //Not Focused
            ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Fontisto name="world" size={24} color="black" /> //Focused
            ) : (
              <Fontisto name="world-o" size={24} color="black" /> //Not Focused
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" /> //Focused
            ) : (
              <Ionicons name="person-outline" size={24} color="black" /> //Not Focused
            ),
        }}
      />
    </Tabs>
  );
}
