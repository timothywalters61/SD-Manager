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

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        //create user doc in database

        db.collection("users").doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("user document exists");
                } else {
                    db.collection("users").doc(user.uid).set({
                        userEmail: user.email,
                        userDisplayName: user.displayName
                    }).then(() => {

                    }).catch(function (error) {
                        alert("user document failed to create because of error: ", error);
                    });
                }
            });

        //set up sidenav

        var data = [user.displayName, user.email];
        setUpSideNav(data);

        //set up project dropdown

        db.collection("projects").where("Team", "array-contains", user.email)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != 0) {
                    setUpProjects(snapshot.docs);
                } else {
                    console.log("projects do not exist");
                    let html = '<li><a href="#">You Currently Have No Projects</a></li>';
                    projectList.innerHTML = html;
                }
            });

        //set up invite dropdown

        db.collection("Invites").where("inviteToID", "==", user.uid)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != 0) {
                    setUpInvites(snapshot.docs);
                } else {
                    console.log("invites do not exist");
                    let html = '<li><a href="#">No Invites</a></li>';
                    inviteList.innerHTML = html;
                    let html2 = 'Invites<span class="badge">0</span>';
                    inviteBadge.innerHTML = html2;
                }
            });

    } else {
        console.log("user logged out");
        window.location.href = "index.html";
    }
});

//logout

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
        //console.log("user has signed out");
    })
        .catch(function (error) {
            console.log("user failed to sign out because of error: ", error);
            alert(error.message);
        });
});