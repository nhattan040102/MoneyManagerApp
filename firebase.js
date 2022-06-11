// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBC-IlXH4bfpJeY1GKZ_i5hUG_c2xDQcWc",
    authDomain: "money-management-app-b1ba1.firebaseapp.com",
    projectId: "money-management-app-b1ba1",
    storageBucket: "money-management-app-b1ba1.appspot.com",
    messagingSenderId: "934585918439",
    appId: "1:934585918439:web:fcbbb46b9aacb1f0309342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// firebase authentication
const auth = getAuth(app);

export {
    app,
    db,
    auth
}