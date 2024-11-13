import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import HotelList from "../../components/MyTrips/TripDetails/HotelList";
import PlannedTrip from "../../components/MyTrips/TripDetails/PlannedTrip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TripDetails() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState({});
  const [plannerItinerary, setPlannerItinerary] = useState([]);
  const tripID = tripDetails?.docId;

  // Format data safely
  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    try {
      const parsedTrip = JSON.parse(trip);
      setTripDetails(parsedTrip);
    } catch (error) {
      console.error("Failed to parse trip data:", error);
    }
  }, [trip]);

  useEffect(() => {
    if (tripID) {
      loadPlannerItinerary(tripID); // Load itinerary for the specific trip
    }
  }, [tripID]); // Separate effect to ensure it only runs when tripID is defined

  //Load planner itinerary for a specific trip
  const loadPlannerItinerary = async (tripID) => {
    try {
      const savedItinerary = await AsyncStorage.getItem(
        `plannerItinerary_${tripID}`
      );
      if (savedItinerary) {
        setPlannerItinerary(JSON.parse(savedItinerary));
      }
    } catch (error) {
      console.error("Failed to load itinerary from storage:", error);
    }
  };

  //Save planner itinerary to AsyncStorage for a specific trip
  const savePlannerItinerary = async (tripID, itinerary) => {
    try {
      await AsyncStorage.setItem(
        `plannerItinerary_${tripID}`,
        JSON.stringify(itinerary)
      );
    } catch (error) {
      console.error("Failed to save itinerary to storage:", error);
    }
  };

  // Update selected itinerary items
  const handleSelectItinerary = (selectedItinerary) => {
    setPlannerItinerary(selectedItinerary);
    savePlannerItinerary(tripID, selectedItinerary);
  };

  // Interpolate scroll position for animated header
  const translateY = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, -250],
    extrapolate: "clamp",
  });

  return (
    tripDetails && (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View style={{ height: 300 }}>
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                  formatData(tripDetails?.tripData)?.locationInfo?.photoRef ||
                  ""
                }&key=AIzaSyBIk_EtPUwxCbu-Yf9JNVtxo10c6oAThhU`,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Animated.View
            style={{
              transform: [{ translateY }],
              backgroundColor: Colors.white,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              padding: 15,
              marginTop: -30,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "PoppinsExtraBold",
                marginBottom: 5,
              }}
            >
              {tripDetails?.tripPlan?.location || "Location not available"}
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text
                style={{ fontFamily: "Poppins", fontSize: 15, color: "gray" }}
              >
                {moment(
                  formatData(tripDetails?.tripData)?.startDate || new Date()
                ).format("DD MMM yyyy")}
              </Text>
              <Text
                style={{ fontFamily: "Poppins", fontSize: 15, color: "gray" }}
              >
                -{" "}
                {moment(
                  formatData(tripDetails?.tripData)?.endDate || new Date()
                ).format("DD MMM yyyy")}
              </Text>
            </View>
            <Text
              style={{ fontSize: 15, fontFamily: "Poppins", color: "gray" }}
            >
              Travelling:{" "}
              {formatData(tripDetails?.tripData)?.traveller?.title || "Unknown"}
            </Text>

            {/* My Planner Section */}
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 18, fontFamily: "PoppinsBold" }}>
                📋 My Planner
              </Text>
              {/* Display selected itinerary */}
              {plannerItinerary.length > 0 ? (
                plannerItinerary.map((place, index) => (
                  <View
                    key={index}
                    style={{
                      marginVertical: 10,
                      padding: 10,
                      backgroundColor: "#f0f0f0",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      {place.day.charAt(0).toUpperCase()}
                      {place.day.slice(1).replace(/([a-zA-Z])(\d)/, "$1 $2")}
                    </Text>
                    <Text style={{ fontSize: 15, fontFamily: "PoppinsMedium" }}>
                      {place.placeName}
                    </Text>
                    <Text style={{ fontFamily: "Poppins" }}>
                      {place.placeDetails}
                    </Text>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Poppins",
                    fontSize: 15,
                    marginTop: 5,
                    marginBottom: 8,
                  }}
                >
                  No itinerary added to your personal planner.
                </Text>
              )}
            </View>

            <HotelList hotelList={tripDetails?.tripPlan?.hotels || []} />
            <PlannedTrip
              details={tripDetails?.tripPlan?.dailyItinerary || {}}
              onSelectItinerary={handleSelectItinerary}
            />
          </Animated.View>
        </Animated.ScrollView>
      </View>
    )
  );
}
