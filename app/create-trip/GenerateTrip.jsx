import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { useContext } from "react";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyDylH19ZRel0Q9QwzmgE_XfV6ONQYnSwDs";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const router = useRouter();
  const user = auth.currentUser;

  // Initialize chat session on component mount
  useEffect(() => {
    const initializeChat = async () => {
      const session = await model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      });
      setChatSession(session);
    };
    initializeChat();
  }, []);

  useEffect(() => {
    if (tripData && chatSession) {
      setLoading(true);
      generateAiTrip();
    }
  }, [tripData, chatSession]);

  const generateAiTrip = async () => {
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", tripData?.locationInfo?.name)
      .replace("{totalDays}", tripData?.totalDays)
      .replace("{totalNight}", tripData?.totalDays - 1)
      .replace("{traveller}", tripData?.traveller?.title)
      .replace("{budget}", tripData?.budget)
      .replace("{totalDays}", tripData?.totalDays)
      .replace("{totalNight}", tripData?.totalDays - 1);

    console.log("FINAL_PROMPT:", FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const resultText = await result.response.text();
    const tripResult = JSON.parse(resultText);

    setLoading(false);

    const docId = Date.now().toString();
    await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,
      tripData: JSON.stringify(tripResult),
    });

    router.push("(tabs)/home");
  };

  return (
    <View style={{ padding: 25, paddingTop: "35%", backgroundColor: Colors.white, height: "100%" }}>
      <Text style={{ fontFamily: "PoppinsBold", fontSize: 35, textAlign: "center", marginBottom: 10 }}>
        On the way ...
      </Text>
      <Text style={{ fontFamily: "PoppinsMedium", fontSize: 20, textAlign: "center" }}>
        Just a few steps from
      </Text>
      <Text style={{ fontFamily: "PoppinsMedium", fontSize: 20, textAlign: "center" }}>
        creating your itinerary
      </Text>
      <Image source={require("../../assets/images/loading.gif")} style={{ width: "100%", height: 250 }} />
    </View>
  );
}
