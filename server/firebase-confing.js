//dot.env
require('dotenv').config

const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin');
const { getAnalytics } = require('firebase/analytics');
const { getAuth, GoogleAuthProvider } = require('firebase/auth');
const {getFirestore} = require('firebase/firestore')

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.measurementId
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configura el SDK Admin para trabajar con Firestore en el backend
const serviceAccount = require('./engpartner-aa0ce-firebase-adminsdk-db0qc-d7c9c6132c.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();
const fs = getFirestore(app)

// Exporta los módulos que necesitas
module.exports = {db, fs};
