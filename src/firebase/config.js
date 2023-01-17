// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   initializeAuth,
//   getReactNativePersistence,
// } from "firebase/auth/react-native";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkKN7TM3R-XTbmu6Pubxl016_0HpPe9MY",
  authDomain: "react-native-hw-3ad68.firebaseapp.com",
  projectId: "react-native-hw-3ad68",
  storageBucket: "react-native-hw-3ad68.appspot.com",
  messagingSenderId: "532389924106",
  appId: "1:532389924106:web:ecb2bd5a998d24da5ebef3",
  measurementId: "G-VM8BNHRXVR",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export { auth };

// export const db = getFirestore(app);
let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}
export { app, auth };
export const db = getFirestore(app);
