// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrRuEPDDMux1Uv8LMOPzP5kwDGkm2iNv0",
  authDomain: "reproductor-a8ee8.firebaseapp.com",
  projectId: "reproductor-a8ee8",
  storageBucket: "reproductor-a8ee8.appspot.com",
  messagingSenderId: "252093973675",
  appId: "1:252093973675:web:53fb374030e042821fa3ee",
  measurementId: "G-PDH44FM4F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);