// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from './firebase-config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the firestore database
const database = getFirestore(app);

export default database;