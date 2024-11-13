import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/landing.jpg")}
        style={{resizeMode: "cover", height: "100%"}}
      >
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
      </ImageBackground>
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
    color: Colors.white,
  },

  subTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    marginTop: 20,
    color:Colors.white
  },

  loginBtn: {
    width: "100%",
    marginTop: "80%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.yellow,
  },
});
