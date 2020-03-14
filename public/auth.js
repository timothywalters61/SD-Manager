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
        console.log("user logged in: ", user);
        if (user.displayName != null) {
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
    const signUpPassword = signupForm['signup-password'].value;
    const signUpConfirmpassword = signupForm['signup-confirmpassword'].value;

    if ((signUpPassword === signUpConfirmpassword) && (signUpPassword.length >= 6)) {
        auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword).then(cred => {
            console.log(cred.user);
            cred.user.updateProfile({
                displayName: signUpUsername
            }).then(function () {
                console.log("username saved as: ", signUpUsername);
                const modal = document.querySelector("#modal-signup");
                M.Modal.getInstance(modal).close();
                signupForm.reset();
                alert("user successfully created");
                window.location.href = "userHome.html";
            }).catch(function (error) {
                console.log("error saving username: ", error);
                alert(error.message);
            });
        })
            .catch(function (error) {
                console.log("failed to authenticate user because of error: ", error);
                alert(error.message);
            });
    } else {
        console.log("passwords must match and be 6 or more characters long!!!");
        alert("passwords must match and be 6 or more characters long!!!");
    }
});

//login

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginEmail = loginForm['login-email'].value;
    const loginPassword = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(cred => {
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        //alert("successfully logged in");
        window.location.href = "userHome.html";
        //console.log(cred.user);
    })
        .catch(function (error) {
            console.log("user failed to sign in because of error: ", error);
            alert(error.message);
        });
});