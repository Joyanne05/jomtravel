import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function OptionCard({ option, selectedOption }) {
  return (
    <View
      style={[
        {
          padding: 20,
          backgroundColor: Colors.lightgray,
          borderRadius: 10,
          marginTop: 8,
          marginBottom: 15,
        },
        //Conditional statement to highlight selected option
        selectedOption?.id == option?.id && { borderWidth: 2 },
      ]}
    >
      <View>
        <Text style={styles.optionTitle}>{option?.title}</Text>
        <Text style={styles.optionDesc}>{option?.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
  optionDesc: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
});
