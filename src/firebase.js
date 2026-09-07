import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update, push, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwQqrlMaV-lPs3A-HaYTEhzSKc5s8g3Ww",
  authDomain: "zeynepcemalimparatorluk.firebaseapp.com",
  projectId: "zeynepcemalimparatorluk",
  storageBucket: "zeynepcemalimparatorluk.firebasestorage.app",
  messagingSenderId: "646146388220",
  appId: "1:646146388220:web:9803a9c93a533303b4a779",
  databaseURL: "https://zeynepcemalimparatorluk-default-rtdb.europe-west1.firebasedatabase.app" // Fixed region format for RTDB
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
