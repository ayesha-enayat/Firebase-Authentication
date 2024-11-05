import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCu1S5M-V35XLi38qy6UlDljUz66279GRo",
    authDomain: "demoproject-545c5.firebaseapp.com",
    projectId: "demoproject-545c5",
    storageBucket: "demoproject-545c5.appspot.com",
    messagingSenderId: "503972781048",
    appId: "1:503972781048:web:349e6f8b14f4b683f5d40d",
    measurementId: "G-Q3W64TTMS8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth,getAuth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signOut,signInWithPopup, GoogleAuthProvider,provider }



