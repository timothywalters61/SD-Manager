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


const projectTitle = document.querySelector("#PageHeading");
let heading = `<p>Project: ${projectName}</p>`;
projectTitle.innerHTML = heading;

const gitLink = document.querySelector('#gitLink');
db.collection("projects").doc(projectID)
    .onSnapshot(function (doc) {
        let git = `<a href="${doc.data().repository}">Git</a>`;
        gitLink.innerHTML = git;
    });

auth.onAuthStateChanged(user => {
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
});

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then(() => {

            window.location.href = "index.html";
        })
        .catch(function (error) {
            console.log("user failed to sign out because of error: ", error);
            alert(error.message);
        });
});

let des, owner, team, github;

db.collection("projects").doc(projectID)
    .onSnapshot(function (doc) {
        if (doc.exists) {


            des = doc.data().description;
            team = doc.data().Team;
            owner = doc.data().OwnerEmail;
            github = doc.data().repository;

            const desc = document.querySelector('#des');
            const teams = document.querySelector('#team');
            const own = document.querySelector('#owner');
            const gitLink = document.querySelector('#git');

            // description
            let desP = document.createElement('p');
            desP.className = "Title";
            desP.innerText = "Description: ";
            let descript = document.createElement('p');
            descript.className = "descript";
            descript.innerText = des;
            let desEdit = document.createElement('button');
            desEdit.className = "desEdit";
            desEdit.id = "desBtn";
            desEdit.innerText = "Edit";
            desEdit.addEventListener("click", function () {
                console.log("edit description");
            });
            desc.append(desP);
            desc.append(descript);
            //desc.append(desEdit);

            // team
            teamP = document.createElement('p');
            teamP.className = "tTitle";
            teamP.innerText = "Team Members: ";
            teams.append(teamP);

            for (i = 0; i < team.length; i++) {
                /**/
                db.collection('users').where('userEmail', '==', team[i]).onSnapshot(query => {
                    if (!query.empty) {
                        const docs = query.docs;
                        docs.forEach(doc => {
                            const username = doc.data().userDisplayName;
                            const email = doc.data().userEmail;
                            teamMem = document.createElement('li');
                            teamMem.className = "teamMem";
                            teamMem.innerHTML = `<strong>${username}</strong> &lt${email}&gt`;
                            teams.append(teamMem);
                        });
                    } else {
                        console.log(team[i] + 'document does not exist');
                    }
                })
            }

            let teamEdit = document.createElement('button');
            teamEdit.className = "teamEdit";
            teamEdit.id = "teamBtn";
            teamEdit.innerText = "Remove Member";
            teamEdit.addEventListener("click", function () {
                console.log("remove member");
            });
            //teams.append(teamEdit);

            // owner info

            ownerP = document.createElement('p');
            ownerP.className = "Title";
            ownerP.innerText = "Project Owner: ";
            ownerE = document.createElement('p');
            ownerE.className = "ownerE";
            ownerE.innerText = owner;

            own.append(ownerP);
            own.append(ownerE);

            //github info
            gitP = document.createElement('p');
            gitP.className = "Title";
            gitP.innerText = "Github Link: ";
            gitL = document.createElement('a');
            gitL.className = "githubLink";
            gitL.innerText = github;
            gitL.href=github;
            gitEdit = document.createElement('button');
            gitEdit.className = "gitEdit";
            gitEdit.id = "gitBtn";
            gitEdit.innerText = "Edit";
            gitEdit.addEventListener("click", function () {
                console.log("edit github link");
            });
            gitLink.append(gitP);
            gitLink.append(gitL);
            //gitLink.append(gitEdit);


        } else {
            console.log("project does not exist");
        }
    });



//delete
let deleteProj = document.querySelector("#delete");
deleteProj.addEventListener('click', function () {
    let currentUser = auth.currentUser.email;
    console.log(currentUser);
    if (currentUser == owner) {
        console.log("delete");
        db.collection("projects").doc(projectID).delete().then(function () {
            console.log("Document successfully deleted!");
            window.location.href = "userHome.html";


        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        //toast("You are not the owner of this project");
        console.log("you're not the owner");
    }
});

let leaveProj = document.querySelector("#leave");
leaveProj.addEventListener('click', function () {
    let currentUser = auth.currentUser.email;
    if (currentUser == owner) {
        db.collection("projects").doc(projectID).delete().then(function () {
            console.log("Document successfully deleted!");
            window.location.href = "userHome.html";


        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        for (let i = 0; i < team.length; i++) {
            if (currentUser == team[i]) {
                team.splice(i, 1);
                break;
            }
        }

        db.collection("projects").doc(projectID).update({
            Team: team
        }).then(function () {
            window.location.href = "userHome.html";
        });

    }


});
/*
setTimeout(function(){
    // change description 
    let changeDes = document.querySelector("#des").querySelector("#desBtn");
    changeDes.addEventListener('click' , function(){
    
        db.collection("projects").doc(projectID).update({
            description: "changed description"
          }).then(function() {
            window.location.href = "projectDetails.html";
          });
    
    });

}, 3000);
*/