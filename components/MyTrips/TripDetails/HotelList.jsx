import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { GetPhotoRef } from "../../../services/GooglePlaceApi";
import HotelCard from "./HotelCard";


export default function HotelList({ hotelList }) {

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontFamily: "PoppinsBold" }}>
        🏨 Hotel Recommendation
      </Text>
      <FlatList
        style={{ marginTop: 8 }}
        showsHorizontalScrollIndicator={true}
        indicatorStyle="black"
        contentContainerStyle={{ paddingBottom: 15 }}
        horizontal={true}
        data={hotelList}
        renderItem={({ item }) => (
          <HotelCard item={item}/>
        )}
      />
    </View>
  );
}
