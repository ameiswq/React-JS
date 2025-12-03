import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
const firebaseConfig = {
  apiKey: "AIzaSyDDwt_pBoz8t5bydSdK3MDTKDkVtTaGeS0",
  authDomain: "react-hw8.firebaseapp.com",
  projectId: "react-hw8",
  storageBucket: "react-hw8.firebasestorage.app",
  messagingSenderId: "1065593838242",
  appId: "1:1065593838242:web:34ba13d37b7c90fef855fb",
  measurementId: "G-P5S2KHJRZD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
