import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../constants/Colors";
import PlaceCard from "./PlaceCard";

export default function PlannedTrip({ details, tripID, onSelectItinerary }) {
  // State for selected places
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // Load selected places for the specific trip from AsyncStorage on mount
  useEffect(() => {
    const loadSelectedPlaces = async () => {
      if (!tripID) return; // Ensure tripID is defined
      try {
        const savedPlaces = await AsyncStorage.getItem(`selectedPlaces_${tripID}`);
        if (savedPlaces) {
          setSelectedPlaces(JSON.parse(savedPlaces));
        }
      } catch (error) {
        console.error("Failed to load selected places", error);
      }
    };
    loadSelectedPlaces();
  }, [tripID]); // Reload data when tripID changes
  

  // Toggle selection of a place and save to AsyncStorage
  const togglePlaceSelection = async (day, place) => {
    const isSelected = selectedPlaces.some(
      (p) => p.placeName === place.placeName && p.day === day
    );

    // Update the selection list by toggling the current place
    const updatedSelection = isSelected
      ? selectedPlaces.filter((p) => !(p.placeName === place.placeName && p.day === day))
      : [...selectedPlaces, { ...place, day }];

    setSelectedPlaces(updatedSelection);
    onSelectItinerary(updatedSelection); // Pass the updated selection to the parent component

    // Save selected places specific to the current tripID in AsyncStorage
    try {
      await AsyncStorage.setItem(
        `selectedPlaces_${tripID}`,
        JSON.stringify(updatedSelection)
      );
    } catch (error) {
      console.error("Failed to save selected places", error);
    }
  };

  // Sort days in ascending order
  const sortedDays = Object.keys(details).sort((a, b) => {
    const dayA = parseInt(a.replace("day", ""), 10);
    const dayB = parseInt(b.replace("day", ""), 10);
    return dayA - dayB;
  });

  return (
    <View>
      <View>
        <Text style={{ fontSize: 18, fontFamily: "PoppinsBold", marginTop: 15 }}>
          🚞 Daily Itinerary
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        {sortedDays.map((day) => (
          <View key={day}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "PoppinsMedium",
                marginTop: 10,
              }}
            >
              {day.charAt(0).toUpperCase() + day.slice(1).replace(/([a-zA-Z])(\d)/, "$1 $2")}
            </Text>
            {details[day].placesToVisit.map((place, index) => {
              const isSelected = selectedPlaces.some(
                (p) => p.placeName === place.placeName && p.day === day
              );
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => togglePlaceSelection(day, place)}
                >
                  <PlaceCard place={place} isSelected={isSelected} />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
