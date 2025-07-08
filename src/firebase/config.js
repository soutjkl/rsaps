import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Configuración específica para tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyD7cmy7lXVpySK9Bc-KIfCzPh-2Kd1b73M",
  authDomain: "apsnacional-be7f8.firebaseapp.com",
  databaseURL: "https://apsnacional-be7f8-default-rtdb.firebaseio.com",
  projectId: "apsnacional-be7f8",
  storageBucket: "apsnacional-be7f8.firebasestorage.app",
  messagingSenderId: "661854018532",
  appId: "1:661854018532:web:fea74d5a5b0901570245f1",
  measurementId: "G-QLSG0CBB5L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged
};