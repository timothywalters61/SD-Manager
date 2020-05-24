/**
 * @description This page contains all the firebase initialization detials
 */

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDHV8vWeacVEzpFnJCBR7kvmuytDIVr9cA",
    authDomain: "sd-manager.firebaseapp.com",
    databaseURL: "https://sd-manager.firebaseio.com",
    projectId: "sd-manager",
    storageBucket: "sd-manager.appspot.com",
    messagingSenderId: "927592244800",
    appId: "1:927592244800:web:fad1b7802496bf0f9be1a5",
    measurementId: "G-PK9YGDEBWD"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();