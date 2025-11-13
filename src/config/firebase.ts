import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrgkuIQ8hlnWVrI48028lSU3xdjOYYeKU",
  authDomain: "dias-f4f3d.firebaseapp.com",
  projectId: "dias-f4f3d",
  storageBucket: "dias-f4f3d.firebasestorage.app",
  messagingSenderId: "1083632623023",
  appId: "1:1083632623023:web:07e57f1c3e25139868235a",
  measurementId: "G-CEBY1HXDFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

export default app;

