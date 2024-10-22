import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Image />
      <View style={styles.container}>
        <Text style={styles.title}>Find your</Text>
        <Text style={styles.title}>perfect plan</Text>
        <Text style={styles.title}>
          in <Text style={{ fontFamily: "PoppinsBold" }}>Jom Travel</Text>
        </Text>
        <Text style={styles.subTitle}>AI Trip Planner</Text>

        <TouchableOpacity
          onPress={() => router.push("auth/login")}
          style={styles.loginBtn}
        >
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: Colors.white,
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 50,
  },

  title: {
    fontFamily: "Poppins",
    fontSize: 40,
  },

  subTitle: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginTop: 20,
  },

  loginBtn: {
    width: "100%",
    marginTop: "80%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.yellow,
  },
});
