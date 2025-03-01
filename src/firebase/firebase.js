import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCoZJvxEoTj3jmBHEv7dD4twM1SSVweZwA",
    authDomain: "blossom-breeze.firebaseapp.com",
    projectId: "blossom-breeze",
    storageBucket: "blossom-breeze.firebasestorage.app",
    messagingSenderId: "1051114246444",
    appId: "1:1051114246444:web:9fd98f88923e0d3e045c89",
    measurementId: "G-N4SY1MCB9Z"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
 export default db;