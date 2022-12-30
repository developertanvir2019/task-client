// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXvSpHNfhrrRkBs85WNGe1JlIn-kbzzkc",
    authDomain: "task-mission.firebaseapp.com",
    projectId: "task-mission",
    storageBucket: "task-mission.appspot.com",
    messagingSenderId: "603446243087",
    appId: "1:603446243087:web:307e8d55cef4263f59587a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;