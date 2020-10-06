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

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('user logged in: ', user);
        //create user doc in database

        localStorage.setItem('username', user.displayName);

        db.collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log('user document exists');
                } else {
                    db.collection('users')
                        .doc(user.uid)
                        .set({
                            userEmail: user.email,
                            userDisplayName: user.displayName,
                        })
                        .then(() => {})
                        .catch(function (error) {
                            alert(
                                'user document failed to create because of error: ',
                                error
                            );
                        });
                }
            });

        //set up projects

        db.collection('projects')
            .where('Team', 'array-contains', user.email)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != 0) {
                    setUpProjects(snapshot.docs);
                } else {
                    console.log('projects do not exist');
                    const projectBox = document.querySelector(
                        '#projectContainer'
                    );
                    let html =
                        '<div class="project-box"><a href="#"></a><span>No Projects Yet!!!</span></div>';
                    projectBox.innerHTML = html;
                }
            });

        /*db.collection("users").doc(user.uid).get().then(function(doc) {
            let notifs = doc.data().notifications;
            console.log(notifs.length);

            let notifBadge = document.getElementById('notifications');
            notifBadge.innerText = notifs.length +" Notifications";
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });*/

        db.collection("users").doc(user.uid).onSnapshot(function(doc) {
            let notifs = doc.data().notifications;
            console.log(notifs);

            let notifBadge = document.getElementById('notifications');
            notifBadge.innerText = notifs.length +" Notifications";
        });

        //set up invite badge

        const inviteBadge = document.querySelector('#inviteBadge');

        db.collection('Invites')
            .where('inviteToID', '==', user.uid)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != 0) {
                    let html = `<span class="badge">${snapshot.docs.length}</span> Invites`;
                    inviteBadge.innerHTML = html;
                    localStorage.setItem('invites', snapshot.docs.length);
                } else {
                    console.log('invites do not exist');
                    let html2 = '<span class="badge">0</span> Invites';
                    inviteBadge.innerHTML = html2;
                }
            });
    } else {
        console.log('user logged out');
        window.location.href = 'index.html';
    }
});

//logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut()
        .then(() => {
            //console.log("user has signed out");
        })
        .catch(function (error) {
            console.log('user failed to sign out because of error: ', error);
            alert(error.message);
        });
});
