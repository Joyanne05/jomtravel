import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";

export default function Home() {
  const [userTrips, setUserTrips] = useState([]);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      <View
        style={{
          padding: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "PoppinsBold", fontSize: 36 }}>
          My Trips
        </Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={45} color="black" />
        </TouchableOpacity>
      </View>

      {/* If no trips, show new trip card */}
      {userTrips?.length == 0 ? <StartNewTripCard /> : null}
    </SafeAreaView>
  );
}
