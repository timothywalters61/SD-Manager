//const { checkDateBeforeCurrentDate, checkIsNotANumber, isValidEmail, containsInput } = require('../../../../testingCode/embeddedFunctions');

var firebaseConfig = {
    apiKey: 'AIzaSyB1akwPd-xOMCgU9_Bc6OqdTObTp10Sb5k',
    authDomain: 'scrum-manager-91e13.firebaseapp.com',
    databaseURL: 'https://scrum-manager-91e13.firebaseio.com',
    projectId: 'scrum-manager-91e13',
    storageBucket: 'scrum-manager-91e13.appspot.com',
    messagingSenderId: '332929508306',
    appId: '1:332929508306:web:5f1773dc956813db641e0b',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
var user = auth.currentUser;
const typingTimeInterval = 3000;
var typingTimer;
var isUsernameUnique = false;
const usernameInput = document.querySelector('#signup-username');

const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.displayName) {
            console.log('user logged in: ', user);
            window.location.href = 'userHome.html';
        }
    } else {
        console.log('user logged out');
    }
});

//signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(typingTimer);
    const submit = document.querySelector('#signup-button');
    submit.disabled = true;
    const signUpEmail = signupForm['signup-email'].value;
    const signUpUsername = signupForm['signup-username'].value;
    const signUpFirstName = signupForm['signup-firstname'].value;
    const signUpLastName = signupForm['signup-lastname'].value;
    const signUpPassword = signupForm['signup-password'].value;
    const signUpConfirmpassword = signupForm['signup-confirmpassword'].value;

    db.collection('users')
        .where('userDisplayName', '==', signUpUsername)
        .onSnapshot((query) => {
            if (!query.empty) {
                // alert user to enter different user name
                isUsernameUnique = false;
            } else {
                isUsernameUnique = true;
                console.log('Username is unique');
            }
        });

    if (
        signUpPassword === signUpConfirmpassword &&
        signUpPassword.length >= 6
    ) {
        let obs = (query) => {
            if (!query.exists) {
                // Create account
                unsubscribeOnSnap();
                usernameInput.removeEventListener(
                    'keyup',
                    checkUsername,
                    false
                );
                usernameInput.removeEventListener('keydown', stopTimer, false);
                console.log('Sign Up: Creating Account');
                auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
                    .then((cred) => {
                        unsubscribe();
                        user = cred.user;
                        console.log('Sign up: updating profile...');
                        return cred.user.updateProfile({
                            displayName: signUpUsername,
                        });
                    })
                    .then(() => {
                        console.log('Sign up: creating document...');
                        return db.collection('users').doc(user.uid).set({
                            userEmail: signUpEmail,
                            userDisplayName: signUpUsername,
                            userFirstName: signUpFirstName,
                            userLastName: signUpLastName,
                        });
                    })
                    .then(() => {
                        signupForm.reset();
                        // submit.disabled = false;
                        console.log('Sign up: reset form and redirect...');
                        window.location.href = 'userHome.html';
                    })
                    .catch(function (error) {
                        console.log(
                            'failed to authenticate user because of error: ',
                            error
                        );
                        alert(error);
                        toastError(error);
                        usernameInput.addEventListener(
                            'keyup',
                            checkUsername,
                            false
                        );
                        usernameInput.addEventListener(
                            'keydown',
                            stopTimer,
                            false
                        );
                        submit.disabled = false;
                    });
            } else {
                // alert user to enter different user name
                toastError('Username already exists');
                console.log('Username already exists');
            }
        };

        let unsubscribeOnSnap = db
            .collection('users')
            .where('userDisplayName', '==', signUpUsername)
            .onSnapshot(obs);
        // if (isUsernameUnique) {
        //     usernameInput.removeEventListener('keyup', checkUsername, false);
        //     usernameInput.removeEventListener('keydown', stopTimer, false);
        //     auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        //         .then((cred) => {
        //             user = cred.user;
        //             return cred.user.updateProfile({
        //                 displayName: signUpUsername,
        //             });
        //         })
        //         .then(() => {
        //             return db.collection('users').doc(user.uid).set({
        //                 userEmail: signUpEmail,
        //                 userDisplayName: signUpUsername,
        //                 userFirstName: signUpFirstName,
        //                 userLastName: signUpLastName,
        //             });
        //         })
        //         .then(() => {
        //             signupForm.reset();
        //             window.location.href = 'userHome.html';
        //         })
        //         .catch(function (error) {
        //             console.log(
        //                 'failed to authenticate user because of error: ',
        //                 error
        //             );
        //             toastError(error);
        //             usernameInput.addEventListener(
        //                 'keyup',
        //                 checkUsername,
        //                 false
        //             );
        //             usernameInput.addEventListener('keydown', stopTimer, false);
        //         });
        // } else {
        //     toast('Username already exists');
        // }
    } else {
        console.log('passwords must match and be 6 or more characters long!!!');
        toast('Passwords must match and be 6 or more characters long.');
    }
});

// username

const checkUsername = (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        // check if username exists
        const username = signupForm['signup-username'].value;
        db.collection('users')
            .where('userDisplayName', '==', username)
            .onSnapshot((query) => {
                if (!query.empty) {
                    // alert user to enter different user name
                    toastError('Username already exists');
                    console.log('Username already exists');
                } else {
                    isUsernameUnique = true;
                    console.log('Username is unique');
                }
            });
    }, typingTimeInterval);
};

usernameInput.addEventListener('keyup', checkUsername, false);

const stopTimer = (e) => {
    clearTimeout(typingTimer);
};

usernameInput.addEventListener('keydown', stopTimer, false);
