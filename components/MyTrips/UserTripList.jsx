import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function UserTripList({ userTrips }) {
  const router = useRouter();
  if (!userTrips || userTrips.length === 0) {
    return (
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text>No trips available.</Text>
      </View>
    );
  }

  // Sort trips to show the latest trip first
  const sortedTrips = userTrips.sort(
    (a, b) => Number(b.docId) - Number(a.docId)
  );

  const LatestTrip = sortedTrips[0]?.tripData
    ? JSON.parse(sortedTrips[0].tripData)
    : null;

  return (
    <View>
      {LatestTrip?.locationInfo?.photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=AIzaSyBIk_EtPUwxCbu-Yf9JNVtxo10c6oAThhU`,
          }}
          style={{
            width: "100%",
            height: 150,
            marginTop: 15,
            objectFit: "cover",
            borderRadius: 15,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/images/placeholderpic.jpg")}
          style={{
            width: "100%",
            height: 150,
            marginTop: 15,
            objectFit: "cover",
            borderRadius: 15,
          }}
        />
      )}
      <View>
        <Text
          style={{ fontFamily: "PoppinsBold", fontSize: 20, marginTop: 10 }}
        >
          {sortedTrips[0]?.tripPlan?.location || "Unknown Location"}
        </Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Poppins", fontSize: 15, color: "grey" }}>
            {LatestTrip
              ? moment(LatestTrip.startDate).format("DD MMM yyyy")
              : "N/A"}
          </Text>
          <Text style={{ fontFamily: "Poppins", fontSize: 15, color: "grey" }}>
            Travelling: {LatestTrip?.traveller?.title || "N/A"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "trip-details",
              params: { trip: JSON.stringify(sortedTrips[0]) },
            })
          }
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "PoppinsSemiBold",
              textAlign: "center",
            }}
          >
            View Plan
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: Colors.lightgray,
            borderRadius: 10,
            width: 120,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsSemiBold",
              fontSize: 15,
              padding: 5,
              textAlign: "center",
            }}
          >
            All Trips ({userTrips.length})
          </Text>
        </View>
      </View>
      {sortedTrips.map((trip, index) => (
        <UserTripCard trip={trip} key={index} />
      ))}
    </View>
  );
}
