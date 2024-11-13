import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { auth, db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripList from "../../components/MyTrips/UserTripList";
import { useRouter } from "expo-router";

export default function Home() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      GetMyTrips();
    } else {
      setLoading(false); // Stop loading if user is unavailable
    }
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);

    try {
      const q = query(
        collection(db, "UserTrips"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => doc.data());
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false); // Ensure loading stops even on error
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, height: "100%" }}>
      {loading && <ActivityIndicator size="large" color="black" />}
      <ScrollView style={{ padding: 35 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "PoppinsBold", fontSize: 36 }}>
            My Trips
          </Text>

          {/* Add new trip button */}
          <TouchableOpacity
            onPress={() => router.push("/create-trip/SearchPlace")}
          >
            <Ionicons name="add-circle" size={45} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Colors.lightgray,
            borderRadius: 10,
            width: 120,
            marginTop: 20
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsSemiBold",
              fontSize: 15,
              padding: 5,
              textAlign: "center",
            }}
          >
            Latest Trip
          </Text>
        </View>
        <View>
          {userTrips?.length === 0 && !loading ? (
            <StartNewTripCard />
          ) : (
            <UserTripList userTrips={userTrips} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
