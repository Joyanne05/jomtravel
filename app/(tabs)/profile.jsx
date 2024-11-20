import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function profile() {
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ padding: 30 }}>
        {/* Avatar section */}
        <View>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ margin: "auto" }}
          />
          {/* Edit avatar */}
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              borderWidth: 1,
              padding: 8,
              borderRadius: 10,
              marginTop: 10,
              width: 80,
              marginLeft: 250,
            }}
          >
            <Entypo name="edit" size={20} color="black" />
            <Text style={{ fontFamily: "Poppins", fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settings}>
          <Ionicons name="person-sharp" size={24} color="black" />
          <Text style={styles.settingsText}>My Information</Text>
        </View>
        <View style={styles.settings}>
          <MaterialIcons name="stars" size={24} color="black" />
          <Text style={styles.settingsText}>Rate Us</Text>
        </View>
        <View style={styles.settings}>
          <MaterialIcons name="policy" size={24} color="black" />
          <Text style={styles.settingsText}>Privacy Policy</Text>
        </View>
        <View style={styles.settings}>
          <Ionicons name="document" size={24} color="black" />
          <Text style={styles.settingsText}>Terms of Use</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            backgroundColor: "#FF7467",
            padding: 10,
            borderRadius: 10,
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 18,
              color: "white",
              marginLeft: 115,
            }}
          >
            Log out
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 12,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Version 1.0. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settings: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  settingsText: {
    fontFamily: "Poppins",
    fontSize: 18,
  },
});
