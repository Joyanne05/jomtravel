import { View, Text, Image } from "react-native";
import React, {useState, useEffect} from "react";
import { Colors } from "../../../constants/Colors";
import { GetPhotoRef } from "../../../services/GooglePlaceApi";

export default function PlaceCard({place, isSelected}) {

  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(place
      
      .placeName);
    setPhotoRef(result);
  };

  return (
    <View
      style={{
        borderColor: isSelected ? "black" : "transparent",
        borderWidth: 2,
        padding: 10,
        backgroundColor: Colors.lightgray,
        borderRadius: 15,
        marginTop: 20,
      }}
    >
      <Image
        style={{ width: "100%", height: 120, borderRadius: 15 }}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=AIzaSyBIk_EtPUwxCbu-Yf9JNVtxo10c6oAThhU`,
        }}
      />
      {/* Place details */}
      <View style={{ paddingLeft: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontFamily: "PoppinsBold" }}>
          {place.placeName}
        </Text>
        <Text style={{ fontSize: 15, fontFamily: "Poppins" }}>
          {place.placeDetails}
        </Text>
        <Text style={{ fontSize: 14, fontFamily: "Poppins" }}>
          🎟️ {place.ticketPricing}
        </Text>
      </View>
    </View>
  );
}
