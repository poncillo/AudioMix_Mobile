// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzNY8lk84TlwtqYLV65D0n9Zm7VwwmJ9E",
  authDomain: "anteproyecto-base-de-datos.firebaseapp.com",
  projectId: "anteproyecto-base-de-datos",
  storageBucket: "anteproyecto-base-de-datos.firebasestorage.app",
  messagingSenderId: "1000354916398",
  appId: "1:1000354916398:web:1e0397100732fd73f717bf",
  measurementId: "G-43Y5HQVE86"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
// 