import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from "moment";

export default function ReviewTrip() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back("/create-trip/SelectBudget")}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={35}
            color="black"
          />
        </TouchableOpacity>

        <View style={styles.tripInnerContainer}>
          <Text style={styles.tripHeader}>Review Trip</Text>
          <Text style={styles.tripSubHeader}>
            Satisfied with your selections?
          </Text>
          <View>
            <FontAwesome6 name="map-location-dot" size={24} color="black" />
            <Text style={styles.tripDetails}>Destination</Text>
            <Text style={styles.tripDetails}>
              {tripData?.locationInfo?.name}
            </Text>
          </View>

          {/* Date information */}
          <View>
          <Ionicons name="calendar-sharp" size={24} color="black" />
            <Text style={styles.tripDetails}>Date</Text>
            <Text style={styles.tripDetails}>
              {moment(tripData?.startDate).format("DD/MM/YYYY")} - {moment(tripData?.endDate).format("DD/MM/YYYY")}
            </Text>
          </View>

          {/* Continue button */}
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: Colors.black,
              borderRadius: 10,
              marginTop: "63%",
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: "Poppins",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
  },

  tripInnerContainer: {
    padding: 15,
  },

  tripHeader: {
    fontFamily: "PoppinsExtraBold",
    fontSize: 34,
    marginTop: 15,
  },

  tripSubHeader: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginBottom: 40,
  },

  tripDetails: {
    fontFamily: "Poppins",
    fontSize: 18,
  },
});
