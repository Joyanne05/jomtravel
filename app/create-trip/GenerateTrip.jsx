import { View, Text, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyDylH19ZRel0Q9QwzmgE_XfV6ONQYnSwDs"; // Use environment variables in production
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const router = useRouter();
  const user = auth.currentUser;

  // Initialize chat session
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const session = await model.startChat({
          generationConfig: {
            temperature: 0.5,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        });
        setChatSession(session);
      } catch (error) {
        console.error("Chat session initialization failed:", error);
      }
    };
    initializeChat();
  }, []);

  // Check if all necessary fields are filled before generating AI trip
  const isTripDataComplete = () => {
    return (
      tripData?.locationInfo?.name &&
      tripData?.totalDays &&
      tripData?.traveller?.title &&
      tripData?.budget
    );
  };

  // Trigger AI trip generation once all details are available
  useEffect(() => {
    if (chatSession && isTripDataComplete()) {
      generateAiTrip();
    }
  }, [tripData, chatSession]);

  const generateAiTrip = async () => {
    setLoading(true);
    try {
      const prompt = AI_PROMPT.replace(
        /\{location\}/g,
        tripData?.locationInfo.name
      )
        .replace("{totalDays}", tripData?.totalDays)
        .replace("{totalNight}", tripData?.totalDays - 1)
        .replace("{traveller}", tripData?.traveller?.title)
        .replace("{budget}", tripData?.budget)
        .replace("{totalDays}", tripData?.totalDays);

      console.log(prompt);

      const result = await chatSession.sendMessage(prompt);
      const tripResult = JSON.parse(result.response.text());

      const docId = Date.now().toString();
      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user?.email,
        tripPlan: tripResult,
        tripData: JSON.stringify(tripData),
        docId: docId,
      });

      router.push("(tabs)/home");
    } catch (error) {
      console.error("Failed to generate AI trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: "35%",
        backgroundColor: Colors.white,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "PoppinsBold",
          fontSize: 35,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        On the way ...
      </Text>
      <Text
        style={{
          fontFamily: "PoppinsMedium",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Just a few steps from
      </Text>
      <Text
        style={{
          fontFamily: "PoppinsMedium",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        creating your itinerary
      </Text>
      <Image
        source={require("../../assets/images/loading.gif")}
        style={{ width: "100%", height: 250 }}
      />
      
      {/* Image subject to copyright */}
      <Text
        style={{
          fontFamily: "Poppins",
          fontSize: 13,
          color: "gray",
          textAlign: "center",
        }}
      >
        GIF downloaded from Pinterest
      </Text>
    </View>
  );
}
