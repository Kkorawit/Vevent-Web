// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV6las7NHLtxSHlY3MzHEavjUt8Wwhz_4",
  authDomain: "vevent-capstone.firebaseapp.com",
  projectId: "vevent-capstone",
  storageBucket: "vevent-capstone.appspot.com",
  messagingSenderId: "494710804612",
  appId: "1:494710804612:web:768cc97b709089bdc472d1",
  measurementId: "G-25L4Q38MZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export { app, storage };


