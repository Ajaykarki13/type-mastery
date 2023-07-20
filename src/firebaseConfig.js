

import firebase from 'firebase/compat/app' ;
import 'firebase/compat/auth' ;
import 'firebase/compat/firestore' ;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB37RBQ4Fo668t5qJJsl3aIdl3mGswAlvI",
  authDomain: "type-mastery.firebaseapp.com",
  projectId: "type-mastery",
  storageBucket: "type-mastery.appspot.com",
  messagingSenderId: "511237330470",
  appId: "1:511237330470:web:847c923050cc4b1b77f8e7",
  measurementId: "G-Y1C9V6VHR4"
};

  // initialize firebase application and connect firebase to react application

  firebase.initializeApp(firebaseConfig) ; 

  //  objects
const auth  = firebase.auth();  // for authentication of app
const db = firebase.firestore(); // for storing data


export {auth, db} 


