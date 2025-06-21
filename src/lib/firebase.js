// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJk6mEZ1dEmw2fZtPKmMx51-342R3Hj88",
  authDomain: "react-firebase-learning-b9be6.firebaseapp.com",
  projectId: "react-firebase-learning-b9be6",
  storageBucket: "react-firebase-learning-b9be6.firebasestorage.app",
  messagingSenderId: "896966904415",
  appId: "1:896966904415:web:66dfe47311539fba6ca9ea",
  measurementId: "G-SQXYYBZ3CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db ,storage ,app};
