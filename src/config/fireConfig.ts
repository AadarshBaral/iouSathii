// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, initializeAuth,getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore'
// Your web app's Firebase configuration
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { isLoading } from "expo-font";




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKThMdv5mG-OkaJrG8hlxNM0cEyEV9OVY",
  authDomain: "fir-test-d91ff.firebaseapp.com",
  projectId: "fir-test-d91ff",
  storageBucket: "fir-test-d91ff.appspot.com",
  messagingSenderId: "780080449796",
  appId: "1:780080449796:web:5b7159238f54e2c03ee851",
  measurementId: "G-JNZ7ZV4PXE"
};

// Initialize Firebase
export const serverStamp = Timestamp
const app = initializeApp(firebaseConfig);
export const FireAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)

