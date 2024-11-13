import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import { GetPhotoRef } from "../../../services/GooglePlaceApi";

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName);
    setPhotoRef(result);
  };

  return (
    <View
      style={{
        marginRight: 15,
        width: 210,
        height: 250,
        borderRadius: 15,
        backgroundColor: Colors.lightgray,
        padding: 8,
      }}
    >
      <Image
        style={{ width: 190, height: 100, borderRadius: 15 }}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=AIzaSyBIk_EtPUwxCbu-Yf9JNVtxo10c6oAThhU`,
        }}
      />

      <Text
        style={{
          fontSize: 16,
          fontFamily: "PoppinsMedium",
          padding: 5,
        }}
      >
        {item.hotelName}
      </Text>
      <Text style={{ fontSize: 14, fontFamily: "Poppins" }}>
        ⭐ {item.hotelRating}
      </Text>
      <Text style={{ fontSize: 14, fontFamily: "Poppins" }}>
        🏷️ {item.hotelPrice}
      </Text>
    </View>
  );
}
