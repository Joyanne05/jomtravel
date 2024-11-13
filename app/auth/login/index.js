import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Login() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    // Check if user entered all fields
    if (!email || !password) {
      // iOS error message
      Alert.alert("Error", "Please fill up all fields", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.replace("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, error.code);

        if (errorCode === "auth/invalid-credential") {
          Alert.alert("Error", "User not found", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      <View style={{ padding: 40 }}>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.heading}>Login To</Text>
          <Text style={styles.heading}>Jom Travel</Text>
          <Text style={styles.subHeading}>Plan Your Next Trip With Us.</Text>
          <Text style={styles.subHeading}>Anytime, Anywhere.</Text>
        </View>
        <View style={styles.formContainer}>
          {/* Email  */}
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          />

          {/* Password  */}
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
                <Entypo name="eye-with-line" size={20} color="black" />
              ) : (
                <Entypo name="eye" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={{ fontFamily: "Poppins", textAlign: "right" }}>
            Forgot Password?
          </Text>
        </View>

        {/* Login button */}
        <TouchableOpacity onPress={onSignIn} style={styles.loginBtn}>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: Colors.white,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.replace("auth/sign-up")}
          style={styles.signupBtn}
        >
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: Colors.black,
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },

  heading: {
    fontFamily: "PoppinsBold",
    fontSize: 34,
  },

  subHeading: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginTop: 5,
  },

  formContainer: {
    marginTop: 40,
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

  loginBtn: {
    width: "100%",
    marginTop: "10%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.yellow,
  },

  signupBtn: {
    width: "100%",
    marginTop: "10%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
});
