import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";


export default function StartNewTripCard() {
  const router = useRouter(); 
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 110 }}>
        <FontAwesome5 name="map-marker-alt" size={34} color="black" />
        <Text style={{ marginTop: 20, fontFamily: "PoppinsSemiBold", fontSize: 24 }}>
          No trips planned yet
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: "Poppins",
            fontSize: 17,
            textAlign:"center"
          }}
        >
          Looks like it's time to kickstart your first adventure!
        </Text>
        

        {/* Create new trip */}
        <TouchableOpacity
        onPress={()=>router.push("/create-trip/SearchPlace")}
          style={{
            width: "50%",
            borderRadius: 10,
            marginTop: 50,
            backgroundColor: "#003580",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 17,

              color: "white",
              padding: 10,
              textAlign: "center",
            }}
          >
            Start a new trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
