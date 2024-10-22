import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";
import Entypo from "@expo/vector-icons/Entypo";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = () => {
    // Check if user entered all fields 
    if (!email || !password || !fullName) {
      // iOS error message
      Alert.alert("Error", "Please fill up all fields", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        router.replace("/auth/login");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      <View style={{ padding: 40 }}>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.heading}>Let's Get Started</Text>
          <Text style={styles.subHeading}>Create a new account</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Full Name */}
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setFullName(value)}
          />

          {/* Email */}
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          />

          {/* Password */}
          <Text style={styles.inputTitle}>Password</Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              marginTop: 8,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{ flex: 1 }}
              secureTextEntry={!showPassword}
              onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Entypo name="eye" size={20} color="black" />
              ) : (
                <Entypo name="eye-with-line" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign up button */}
        <TouchableOpacity onPress={OnCreateAccount} style={styles.signupBtn}>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: Colors.white,
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          onPress={() => router.replace("auth/login")}
          style={styles.loginBtn}
        >
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: Colors.black,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "PoppinsBold",
    fontSize: 34,
  },

  subHeading: {
    fontFamily: "Poppins",
    fontSize: 18,
  },

  formContainer: {
    marginTop: 30,
  },

  inputTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 8,
    marginBottom: 10,
  },

  signupBtn: {
    width: "100%",
    marginTop: "10%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.yellow,
  },

  loginBtn: {
    width: "100%",
    marginTop: "10%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
});
