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

export const AI_PROMPT =
  "Generate a travel plan for {location}: for {totalDays} Days and {totalNight} Night for {traveller} with a {budget} budget with flight details, flight price with booking url, hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and places to visit nearby with placeName, place details, place image url, geo coordinates, ticket pricing, time to travel to each of the location for {totalDays} days and {totalNight} night each day plan with the best time to visit in JSON format.";
