import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQ-1pWdJeX7CIMJZ6cFEjoja_L4G7286c",
  authDomain: "baigk-5bf00.firebaseapp.com",
  projectId: "baigk-5bf00",
  storageBucket: "baigk-5bf00.firebasestorage.app",
  messagingSenderId: "720146241471",
  appId: "1:720146241471:web:83b4e10e20169f58e9f30a"
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});