import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

export default function SelectDate() {
  const router = useRouter();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  //Will execute everytime tripData changes
  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const onDateChange = (date, type) => {
    console.log(date, type);
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateContinue = () => {
    //Calculate total number of days selected by user
    if (startDate && endDate) {
      const totalDays = endDate.diff(startDate, "days");
      console.log(totalDays + 1);
      setTripData({
        ...tripData,
        startDate: startDate,
        endDate: endDate,
        totalDays: totalDays + 1,
      });

      //Navigate to select budget if dates are selected
      router.push("/create-trip/SelectBudget");
    } else {
      //Alert message if no date is selected
      Alert.alert("Error", "Please select a date", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back("/create-trip/SearchTraveller")}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={35}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.tripInnerContainer}>
          <Text style={styles.tripHeader}>Select Date</Text>
          <Text style={styles.tripSubHeader}>When are you travelling?</Text>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={onDateChange}
              width={330}
              textStyle={{ fontFamily: "Poppins", fontSize: 14 }}
              allowRangeSelection={true}
              minDate={new Date()}
              selectedRangeStyle={{ backgroundColor: Colors.black }}
              selectedDayTextStyle={{ color: Colors.white }}
            />
          </View>

          {/* Continue button */}
          <TouchableOpacity
            onPress={onDateContinue}
            style={{
              padding: 15,
              backgroundColor: Colors.black,
              borderRadius: 10,
              marginTop: "63%",
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
