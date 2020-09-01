//const { checkDateBeforeCurrentDate, checkIsNotANumber, isValidEmail, containsInput } = require('../../../../testingCode/embeddedFunctions');

var firebaseConfig = {
    apiKey: "AIzaSyB1akwPd-xOMCgU9_Bc6OqdTObTp10Sb5k",
    authDomain: "scrum-manager-91e13.firebaseapp.com",
    databaseURL: "https://scrum-manager-91e13.firebaseio.com",
    projectId: "scrum-manager-91e13",
    storageBucket: "scrum-manager-91e13.appspot.com",
    messagingSenderId: "332929508306",
    appId: "1:332929508306:web:5f1773dc956813db641e0b"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
var user = auth.currentUser;

auth.onAuthStateChanged(user => {
    if (user) {
        if (user.displayName) {
            console.log("user logged in: ", user);
            window.location.href = "userHome.html";
        }
    } else {
        console.log("user logged out");
    }
});

//login

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginEmail = loginForm['login-email'].value;
    const loginPassword = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(cred => {
        loginForm.reset();
        window.location.href = "userHome.html";
        //console.log(cred.user);
    })
        .catch(function (error) {
            console.log("user failed to sign in because of error: ", error);
            toast(error);
        });
});