// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app);

export { app, auth };