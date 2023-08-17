import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDe_TIk-1562ll0ck64hxcgqv1qjfFUbuU",
  authDomain: "dish-be96f.firebaseapp.com",
  projectId: "dish-be96f",
  storageBucket: "dish-be96f.appspot.com",
  messagingSenderId: "540595961654",
  appId: "1:540595961654:web:1e948e81a1e018ab98bd97",
  measurementId: "G-3KEEH9SREP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;