import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { useRouter } from "expo-router";

export default function UserTripCard({ trip }) {
  const router = useRouter();
  
  const formatData = (data) => {
    return JSON.parse(data);
  };
  
  const handlePress = () => {
    router.push({
      pathname: "trip-details",
      params: { trip: JSON.stringify(trip) },
    });
  };
  
  return (
    <View>
      <TouchableOpacity style={styles.tripsContainer} onPress={handlePress}>
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
              formatData(trip.tripData).locationInfo.photoRef
            }&key=AIzaSyBIk_EtPUwxCbu-Yf9JNVtxo10c6oAThhU`,
          }}
          style={styles.cardImg}
        />
        <View>
          <Text style={styles.tripCardTitle}>{trip.tripPlan?.location}</Text>
          <Text style={styles.tripCardText}>
            {moment(trip.tripData.startDate).format("DD MMM yyyy")}
          </Text>
          <Text style={styles.tripCardText}>
            Travelling: {formatData(trip.tripData)?.traveller?.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tripsContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  tripCardTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  tripCardText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "grey",
  },
});
