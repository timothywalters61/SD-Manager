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


const inviteContainer = document.querySelector("#inviteContainer");
const inviteBadge = document.querySelector("#inviteBadge");

loadedInvites = JSON.parse(localStorage.getItem("invitesTesting"));
console.log("loaded" , loadedInvites);

loadedInvitesID = JSON.parse(localStorage.getItem("invitesID"));
console.log("loaded" , loadedInvitesID);

let html = `<span class="badge">${loadedInvites.length}</span> Invites`;
inviteBadge.innerHTML = html;

let html2 = '';

for(let j = 0; j < loadedInvites.length; j++){
    
    const inviteFrom = loadedInvites[j].inviteFromEmail;
    const project = loadedInvites[j].projectID;
    const projectName =loadedInvites[j].projectName;
    const docID = loadedInvitesID[j];
    const li = `<div class="invites">${inviteFrom} has invited you to join their team and help develop <p> ${projectName}</p> <button type="button" class="acceptInviteButtons" onclick="acceptInvite('${project}','${docID}')">Accept</button><button type="button" class="declineInviteButtons" onclick="declineInvite('${docID}')">Decline</button></div>`;
    console.log(inviteFrom);
    console.log(project);

    console.log(projectName);

    html2 = html2 + li;
}
inviteContainer.innerHTML = html2;

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        

        db.collection("users").doc(user.uid).get().then(function(doc) {
            let notifs = doc.data().notifications;
            console.log(notifs.length);
    
            let notifBadge = document.getElementById('notifications');
            notifBadge.innerText = notifs.length +" Notifications";
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        //set up invites

        

        

        db.collection("Invites").where("inviteToID", "==", user.uid)
            .onSnapshot(function (snapshot) {
                if (snapshot.docs != loadedInvites.length) {
                    setUpInvites(snapshot.docs);
                } else {
                    console.log("invites do not exist");
                    let html2 = '<span class="badge">0</span> Invites';
                    inviteBadge.innerHTML = html2;
                    let html3 = '<div class="invites">You have not been invited to any projects</div>';
                    inviteContainer.innerHTML = html3
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