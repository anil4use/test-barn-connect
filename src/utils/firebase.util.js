// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXTVEcDIHcbV-2J0H9vt9L7W866W7Xjg8",
    authDomain: "barn-connect-92f27.firebaseapp.com",
    projectId: "barn-connect-92f27",
    storageBucket: "barn-connect-92f27.appspot.com",
    messagingSenderId: "556305566004",
    appId: "1:556305566004:web:a1637686587ea9c9c2fd61",
    measurementId: "G-F86YZFY58P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);