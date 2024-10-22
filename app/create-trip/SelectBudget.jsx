import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectBudgetList } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectBudget() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const onClickContinue = () => {
    if (selectedOption) {
      router.push("/create-trip/ReviewTrip");
    } else {
        //Alert message if no date is selected
      Alert.alert("Error", "Please select a budget", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }

  //Executes everytime selectedOption changes
  useEffect(() => {
    selectedOption && setTripData({
        ...tripData,
        budget: selectedOption?.title,
      });
  }, [selectedOption]);

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
          <Text style={styles.tripHeader}>Select Budget</Text>
          <Text style={styles.tripSubHeader}>Choose your spending habit</Text>
          <FlatList
            data={SelectBudgetList}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedOption(item)}>
                <OptionCard option={item} selectedOption={selectedOption} />
              </TouchableOpacity>
            )}
          />
          {/* Continue button */}
          <TouchableOpacity
            onPress={() => onClickContinue()}
            style={{
              padding: 15,
              backgroundColor: Colors.black,
              borderRadius: 10,
              marginTop: "35%",
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
    marginBottom: 40,
  },
});
