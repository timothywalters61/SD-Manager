console.log("in " , location.href.split("/").slice(-1)[0]); 

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
const projectID = localStorage.getItem("docID");
const ownerID = localStorage.getItem("ownerID");
const projectName = localStorage.getItem("docName");
console.log("from local " + localStorage.getItem("invites"));

console.log("from local " + localStorage.getItem("invitesTesting"));

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        //console.log(data);

        //only project owner can open this page

        if (user.uid != ownerID) {
            window.location.href = "userHome.html";
        }

        //heading

        const projectTitle = document.querySelector("#PageHeading");
        let heading = `<p>Project: ${projectName}</p>`;
        projectTitle.innerHTML = heading;
        /*projectTitle.addEventListener("click", function(){
            window.location.href = "projectDetails.html";
        });*/


        db.collection("projects").doc(projectID)
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    // setUpTeam(doc.data().Team);

                    //git and links

                    const gitLink = document.querySelector('#gitLink');
                    let link = `${doc.data().repository}`;
                    console.log(link);
                    let git = `<a href="${link}">Git</a>`;

                    gitLink.innerHTML = git;
                    console.log(gitLink.innerHTML);

                    // display current sprints

                    if (doc.data().Sprints === "started") {
                        db.collection("projects").doc(projectID).collection("sprints").get().then((querySnapshot) => {
                            setUpSprint(querySnapshot);
                        });
                    }

                } else {
                    console.log("project does not exist");
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

        const inviteBadge = document.querySelector("#inviteBadge");

        db.collection("Invites").where("inviteToID", "==", user.uid)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != 0) {
                    let html = `<span class="badge">${snapshot.docs.length}</span> Invites`;
                    inviteBadge.innerHTML = html;
                } else {
                    console.log("invites do not exist");
                    let html2 = '<span class="badge">0</span> Invites';
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