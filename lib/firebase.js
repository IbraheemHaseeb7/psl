// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIFvx-ITsgFTGbSAhw5nZqtM2bD29Z8mM",
  authDomain: "psl7-cbaa9.firebaseapp.com",
  projectId: "psl7-cbaa9",
  storageBucket: "psl7-cbaa9.appspot.com",
  messagingSenderId: "411835689383",
  appId: "1:411835689383:web:c9f21a64392ac01eb6ee82",
  measurementId: "G-T0DZX3WDJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export const googleAuth = new GoogleAuthProvider();
export const storage = getStorage();
