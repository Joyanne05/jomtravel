// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRyU5yXxAroZXsOX2J8qLAqfB-pfewJ74",
  authDomain: "jomtravel-43639.firebaseapp.com",
  projectId: "jomtravel-43639",
  storageBucket: "jomtravel-43639.appspot.com",
  messagingSenderId: "307460386123",
  appId: "1:307460386123:web:00239295f1b4f03af30cce",
  measurementId: "G-SH10TBLRQV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
