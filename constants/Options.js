export const SelectTravellersList = [
  {
    id: 1,
    title: "Just Me",
    description: "Embracing solo adventures",
    people: "1",
  },

  {
    id: 2,
    title: "A couple",
    description: "Love knows no borders",
    people: "2",
  },

  {
    id: 3,
    title: "Family",
    description: "Bonding with loved ones",
    people: "3 to 5 people",
  },

  {
    id: 4,
    title: "Friends",
    description: "Collecting memories, not things",
    people: "5 to 10 people",
  },
];

export const SelectBudgetList = [
  {
    id: 1,
    title: "Cheap",
    description: "RM1,000 - RM2,500",
  },
  {
    id: 2,
    title: "Moderate",
    description: "RM2,500 - RM5,000",
  },
  {
    id: 3,
    title: "Luxury",
    description: "RM5,000 - RM20,000",
  },
];

export const AI_PROMPT = `Please generate a travel plan for {location} for {totalDays} days and {totalNight} nights for a {traveller} with a {budget} budget. Generate a JSON list of hotel options in {location}. Then, generate a day-by-day itinerary for {totalDays} days. Generate all prices in RM currency. Here is the JSON template: {
  "location": "[location]",
  "duration": "[totalDays] Days and [totalNight] Nights",
  "traveller": "[traveller]",
  "budget": "[budget]",
  "hotels": [
    {
      "hotelName": "[hotelName]",
      "hotelPrice": "[hotelPrice]",
      "hotelRating": "[hotelRating]"
    }
  ],
  "dailyItinerary": {
    "day1": {
      "placesToVisit": [
        {
          "placeName": "[placeName]",
          "placeDetails": "[placeDetails]",
          "ticketPricing": "[ticketPricing]"
        }
      ],
      "foodOptions": [
        {
          "restaurantName": "[restaurantName]",
          "specialtyDishes": ["food1", "food2"],
          "foodPrice": "[foodPrice]"
        }
      ]
    },
    "day2": {
      "placesToVisit": [
        {
          "placeName": "[placeName]",
          "placeDetails": "[placeDetails]",
          "ticketPricing": "[ticketPricing]"
        }
      ],
      "foodOptions": [
        {
          "restaurantName": "[restaurantName]",
          "specialtyDishes": ["food1", "food2"],
          "foodPrice": "[foodPrice]"
         
        }
      ]
    }
  }
}
`;
