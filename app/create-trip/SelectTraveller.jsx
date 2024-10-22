import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/Colors";
import { SelectTravellersList } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectTraveller() {
  const router = useRouter();
  const [selectedTravellers, setSelectedTravellers] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  //Will only execute if there is a selected traveller
  useEffect(() => {
    setTripData({ ...tripData, traveller: selectedTravellers });
  }, [selectedTravellers]);

  //Will execute everytime tripData changes
  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back("/create-trip/SearchPlace")}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={35}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.tripInnerContainer}>
          <Text style={styles.tripHeader}>Select Travellers</Text>
          <Text style={styles.tripSubHeader}>Choose your travel buddy!</Text>

          <FlatList
            data={SelectTravellersList}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedTravellers(item)}>
                <OptionCard option={item} selectedOption={selectedTravellers} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => router.push("/create-trip/SelectDate")}
            style={{
              padding: 15,
              backgroundColor: Colors.black,
              borderRadius: 10,
              marginTop: 10,
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
              Continue
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
    marginBottom: 20,
  },
});
