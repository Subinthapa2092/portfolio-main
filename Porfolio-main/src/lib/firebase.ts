
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGx8o9hqwFGjQhADc1p-GznMRiHe2SPRs",
  authDomain: "subin-94a7d.firebaseapp.com",
  projectId: "subin-94a7d",
  storageBucket: "subin-94a7d.firebasestorage.app",
  messagingSenderId: "930568615900",
  appId: "1:930568615900:web:fa76f915aa093080dbc119",
  measurementId: "G-S8MVM2D15F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
