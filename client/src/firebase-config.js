// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPpyik8XGBmAaUvbkt7PjxU35Qc5hLqWk",
  authDomain: "engpartner-aa0ce.firebaseapp.com",
  projectId: "engpartner-aa0ce",
  storageBucket: "engpartner-aa0ce.appspot.com",
  messagingSenderId: "1063143272771",
  appId: "1:1063143272771:web:288baf241344440c957ff6",
  measurementId: "G-3W9M81JPD8",
  databaseURL: "https://engpartner-aa0ce-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)



export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();