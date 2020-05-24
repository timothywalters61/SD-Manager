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
            return cred.user.updateProfile({
                displayName: signUpUsername
            });
        }).then(() => {
            signupForm.reset();
            alert("user created");
            window.location.href = "userHome.html";
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
        loginForm.reset();
        alert("successfully logged in");
        window.location.href = "userHome.html";
        //console.log(cred.user);
    })
        .catch(function (error) {
            console.log("user failed to sign in because of error: ", error);
            alert(error.message);
        });
});