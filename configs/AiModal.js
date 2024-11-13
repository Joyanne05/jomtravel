const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyDylH19ZRel0Q9QwzmgE_XfV6ONQYnSwDs";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Please generate a travel plan to Kota Kinabalu, Sabah for 5 days and 4 nights for a family with a moderate budget. Generate a JSON list of hotel options in Kota Kinabalu, Sabah. Then, generate a day-by-day itinerary for 5 days. Generate all prices in RM currency. Here is the JSON template: {\n  \"location\": \"[location]\",\n  \"duration\": \"[totalDays] Days and [totalNight] Nights\",\n  \"traveller\": \"[traveller]\",\n  \"budget\": \"[budget]\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"[hotelName]\",\n      \"hotelPrice\": \"[hotelPrice]\",\n      \"hotelRating\": \"[hotelRating]\"\n    }\n  ],\n  \"dailyItinerary\": {\n    \"day1\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"[placeName]\",\n          \"placeDetails\": \"[placeDetails]\",\n          \"ticketPricing\": \"[ticketPricing]\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"[restaurantName]\",\n          \"specialtyDishes\": [\"food1\", \"food2\"],\n          \"foodPrice\": \"[foodPrice]\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"[placeName]\",\n          \"placeDetails\": \"[placeDetails]\",\n          \"ticketPricing\": \"[ticketPricing]\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"[restaurantName]\",\n          \"specialtyDishes\": [\"food1\", \"food2\"],\n          \"foodPrice\": \"[foodPrice]\"\n         \n        }\n      ]\n    }\n  }\n}"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Kota Kinabalu, Sabah\",\n  \"duration\": \"5 Days and 4 Nights\",\n  \"traveller\": \"Family\",\n  \"budget\": \"Moderate\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"The Pacific Sutera Hotel\",\n      \"hotelPrice\": \"RM300 - RM500 per night\",\n      \"hotelRating\": \"4.5 stars\"\n    },\n    {\n      \"hotelName\": \"Shangri-La Rasa Ria Resort & Spa\",\n      \"hotelPrice\": \"RM400 - RM700 per night\",\n      \"hotelRating\": \"5 stars\"\n    },\n    {\n      \"hotelName\": \"Hyatt Regency Kinabalu\",\n      \"hotelPrice\": \"RM350 - RM600 per night\",\n      \"hotelRating\": \"4 stars\"\n    },\n    {\n      \"hotelName\": \"The Waterfront Hotel\",\n      \"hotelPrice\": \"RM250 - RM450 per night\",\n      \"hotelRating\": \"4 stars\"\n    },\n    {\n      \"hotelName\": \"Nexus Resort & Spa Karambunai\",\n      \"hotelPrice\": \"RM300 - RM550 per night\",\n      \"hotelRating\": \"4 stars\"\n    }\n  ],\n  \"dailyItinerary\": {\n    \"day1\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"Sabah State Museum\",\n          \"placeDetails\": \"Learn about the history and culture of Sabah.\",\n          \"ticketPricing\": \"RM10 per adult, RM5 per child\"\n        },\n        {\n          \"placeName\": \"Atkinson Clock Tower\",\n          \"placeDetails\": \"A historic landmark and a popular photo spot.\",\n          \"ticketPricing\": \"Free\"\n        },\n        {\n          \"placeName\": \"Kota Kinabalu City Mosque\",\n          \"placeDetails\": \"A beautiful mosque with stunning architecture.\",\n          \"ticketPricing\": \"Free\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"Kedai Kopi Pin Sang\",\n          \"specialtyDishes\": [\"Laksa\", \"Nasi Lemak\", \"Kaya Toast\"],\n          \"foodPrice\": \"RM10 - RM20 per person\"\n        },\n        {\n          \"restaurantName\": \"Restoran Welcome\",\n          \"specialtyDishes\": [\"Seafood\", \"Local Dishes\"],\n          \"foodPrice\": \"RM20 - RM40 per person\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"Mount Kinabalu National Park\",\n          \"placeDetails\": \"Hike to the summit of Mount Kinabalu or enjoy the scenic views.\",\n          \"ticketPricing\": \"RM30 per adult, RM15 per child\"\n        },\n        {\n          \"placeName\": \"Kinabalu Park Headquarters\",\n          \"placeDetails\": \"Learn about the flora and fauna of the park.\",\n          \"ticketPricing\": \"Free\"\n        },\n        {\n          \"placeName\": \"Poring Hot Springs\",\n          \"placeDetails\": \"Relax and rejuvenate in the natural hot springs.\",\n          \"ticketPricing\": \"RM10 per adult, RM5 per child\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"Kinabalu Park Restaurant\",\n          \"specialtyDishes\": [\"Local Dishes\", \"Western Food\"],\n          \"foodPrice\": \"RM20 - RM40 per person\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"Manukan Island\",\n          \"placeDetails\": \"Enjoy swimming, snorkeling, and sunbathing on this beautiful island.\",\n          \"ticketPricing\": \"RM30 per adult, RM15 per child\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"Manukan Island Restaurant\",\n          \"specialtyDishes\": [\"Seafood\", \"Western Food\"],\n          \"foodPrice\": \"RM20 - RM40 per person\"\n        }\n      ]\n    },\n    \"day4\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"Sabah Cultural Village\",\n          \"placeDetails\": \"Experience the diverse cultures of Sabah.\",\n          \"ticketPricing\": \"RM60 per adult, RM30 per child\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"Sabah Cultural Village Restaurant\",\n          \"specialtyDishes\": [\"Local Dishes\"],\n          \"foodPrice\": \"RM20 - RM40 per person\"\n        }\n      ]\n    },\n    \"day5\": {\n      \"placesToVisit\": [\n        {\n          \"placeName\": \"Jesselton Point\",\n          \"placeDetails\": \"A bustling waterfront area with shops, restaurants, and ferries.\",\n          \"ticketPricing\": \"Free\"\n        },\n        {\n          \"placeName\": \"Filipino Market\",\n          \"placeDetails\": \"A lively market with fresh produce, seafood, and souvenirs.\",\n          \"ticketPricing\": \"Free\"\n        }\n      ],\n      \"foodOptions\": [\n        {\n          \"restaurantName\": \"The Harbour Cafe\",\n          \"specialtyDishes\": [\"Seafood\", \"Western Food\"],\n          \"foodPrice\": \"RM20 - RM40 per person\"\n        },\n        {\n          \"restaurantName\": \"Warung Kopi Likas\",\n          \"specialtyDishes\": [\"Local Dishes\", \"Snacks\"],\n          \"foodPrice\": \"RM10 - RM20 per person\"\n        }\n      ]\n    }\n  }\n}\n```\n"},
      ],
    },
  ],
});
