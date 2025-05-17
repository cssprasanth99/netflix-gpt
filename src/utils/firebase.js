// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl7zck0wOf7E21RlTC6VJbyhTegwPbYe0",
  authDomain: "netflixgpt-19bbd.firebaseapp.com",
  projectId: "netflixgpt-19bbd",
  storageBucket: "netflixgpt-19bbd.firebasestorage.app",
  messagingSenderId: "765234717239",
  appId: "1:765234717239:web:edcad68c3bd5b99ee5d5b2",
  measurementId: "G-FRSSCG221Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
