// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZI3-8cgScCQe5Cjzn7u_pqdhxhDflN2o",
  authDomain: "engpartner-v3.firebaseapp.com",
  projectId: "engpartner-v3",
  storageBucket: "engpartner-v3.appspot.com",
  messagingSenderId: "575982856759",
  appId: "1:575982856759:web:5c0c9ae4fc4b234509edb2",
  measurementId: "G-YBXBVZ811M",
  databaseURL: 'https://engpartner-v3-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)


export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();