// Importa las funciones necesarias de los SDK que necesitas
const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin');
const { getAnalytics } = require('firebase/analytics');
const { getAuth, GoogleAuthProvider } = require('firebase/auth');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCPpyik8XGBmAaUvbkt7PjxU35Qc5hLqWk",
  authDomain: "engpartner-aa0ce.firebaseapp.com",
  projectId: "engpartner-aa0ce",
  storageBucket: "engpartner-aa0ce.appspot.com",
  messagingSenderId: "1063143272771",
  appId: "1:1063143272771:web:288baf241344440c957ff6",
  measurementId: "G-3W9M81JPD8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configura el SDK Admin para trabajar con Firestore en el backend
const serviceAccount = require('./engpartner-aa0ce-firebase-adminsdk-db0qc-d7c9c6132c.json'); // Reemplaza con la ruta correcta
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://engpartner-aa0ce-default-rtdb.firebaseio.com' // Reemplaza con la URL correcta de tu base de datos
});

const db = admin.firestore();

// Exporta los módulos que necesitas
module.exports = {db};
