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
const typingTimeInterval = 3000;
var typingTimer;

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

//signup

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const signUpEmail = signupForm['signup-email'].value;
    const signUpUsername = signupForm['signup-username'].value;
    const signUpFirstName = signupForm['signup-firstname'].value;
    const signUpLastName = signupForm['signup-lastname'].value;
    const signUpPassword = signupForm['signup-password'].value;
    const signUpConfirmpassword = signupForm['signup-confirmpassword'].value;

    if ((signUpPassword === signUpConfirmpassword) && (signUpPassword.length >= 6)) {

        auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword).then(cred => {
            return cred.user.updateProfile({
                displayName: signUpUsername
            });
        }).then(() => {
            return db.collection("users").doc(user.uid).set({
                userEmail: signUpEmail,
                userDisplayName: signUpUsername,
                userFirstName: signUpFirstName,
                userLastName: signUpLastName
            })
        }).then(() => {
            signupForm.reset();
            window.location.href = "userHome.html";
        })
            .catch(function (error) {
                console.log("failed to authenticate user because of error: ", error);
                toast(error);
            });
    } else {
        console.log("passwords must match and be 6 or more characters long!!!");
        toast("passwords must match and be 6 or more characters long!!!");
    }
});

// username

const usernameInput = document.querySelector("#signup-username");
usernameInput.addEventListener('keyup', (e) => {
    clearTimeout(typingTimeInterval);
    typingTimer = setTimeout(() => {
       // check if username exists 
    }, typingTimeInterval);
});