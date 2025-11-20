// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClBv0o3NIkdw6FCQWzVrwcVwIHtLtuqBc",
  authDomain: "react-hw7.firebaseapp.com",
  projectId: "react-hw7",
  storageBucket: "react-hw7.firebasestorage.app",
  messagingSenderId: "425698115108",
  appId: "1:425698115108:web:5e0b90009a7a820fe7e2b1",
  measurementId: "G-L70RNFBQNX"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };