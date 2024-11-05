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
import Ionicons from "@expo/vector-icons/Ionicons";
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

          <View style={{ gap: 30 }}>
            {/* Selected destination */}
            <View style={{ display: "flex", flexDirection: "row", gap: 25 }}>
              <FontAwesome6 name="map-location-dot" size={30} color="black" />
              <View>
                <Text style={styles.tripDetailsTitle}>Destination</Text>
                <Text style={styles.tripDetails}>
                  {tripData?.locationInfo?.name}
                </Text>
              </View>
            </View>

            {/* Selected dates */}
            <View style={{ display: "flex", flexDirection: "row", gap: 25 }}>
              <Ionicons name="calendar-sharp" size={30} color="black" />
              <View>
                <Text style={styles.tripDetailsTitle}>Date</Text>
                <Text style={styles.tripDetails}>
                  {moment(tripData?.startDate).format("DD/MM/YYYY")} -{" "}
                  {moment(tripData?.endDate).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.tripDetails}>({tripData?.totalDays} days)</Text>
              </View>
            </View>

            {/* Selected travellers */}
            <View style={{ display: "flex", flexDirection: "row", gap: 25 }}>
            <Ionicons name="people" size={30} color="black" />
              <View>
                <Text style={styles.tripDetailsTitle}>Travellers</Text>
                <Text style={styles.tripDetails}>
                  {tripData?.traveller?.title}
                </Text>
              </View>
            </View>

            {/* Selected budget */}
            <View style={{ display: "flex", flexDirection: "row", gap: 25 }}>
            <FontAwesome6 name="money-check-dollar" size={30} color="black" />
              <View>
                <Text style={styles.tripDetailsTitle}>Budget</Text>
                <Text style={styles.tripDetails}>
                  {tripData?.budget}
                </Text>
              </View>
            </View>
          </View>


          {/* Generate Trip button */}
          <TouchableOpacity
          onPress={() => router.replace("/create-trip/GenerateTrip")}
            style={{
              padding: 15,
              backgroundColor: Colors.black,
              borderRadius: 10,
              marginTop: "42%",
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
              Generate Trip
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

  tripDetailsTitle:{
    fontFamily:"PoppinsSemiBold", 
    fontSize:18,
    color:"grey",
  },

  tripDetails: {
    fontFamily: "PoppinsMedium",
    fontSize: 20,
  },

});
