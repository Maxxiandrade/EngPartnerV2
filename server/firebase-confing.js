//dot.env
require('dotenv').config

const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin');
const { getAnalytics } = require('firebase/analytics');
const { getAuth, GoogleAuthProvider } = require('firebase/auth');
const {getFirestore} = require('firebase/firestore')

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPpyik8XGBmAaUvbkt7PjxU35Qc5hLqWk",
  authDomain: "engpartner-aa0ce.firebaseapp.com",
  databaseURL: "https://engpartner-aa0ce-default-rtdb.firebaseio.com",
  projectId: "engpartner-aa0ce",
  storageBucket: "engpartner-aa0ce.appspot.com",
  messagingSenderId: "1063143272771",
  appId: "1:1063143272771:web:288baf241344440c957ff6",
  measurementId: "G-3W9M81JPD8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configura el SDK Admin para trabajar con Firestore en el backend
const serviceAccount = require('./engpartner-aa0ce-firebase-adminsdk-db0qc-d7c9c6132c.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://eng-partner-v2-server.vercel.app';

const db = admin.firestore();
const fs = getFirestore(app)

// Exporta los módulos que necesitas
module.exports = {db, fs, API_URL};
