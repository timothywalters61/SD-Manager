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
const currentSprintID = localStorage.getItem("currentSprintID");
const projectName = localStorage.getItem("docName");

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        //console.log(data);

        //only team members can open this page

        db.collection("projects").doc(projectID)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.data().Team.includes(user.email)) {
                        console.log("in the team");
                    } else {
                        window.location.href = "userHome.html";
                    }
                } else {
                    console.log("project does not exist");
                }
            });

        //heading

        const projectTitle = document.querySelector("#PageHeading");
        let heading = `<p>${projectName}</p>`;
        projectTitle.innerHTML = heading;

        

        db.collection("projects").doc(projectID)
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    console.log(doc.data().Team);
                    //setUpTeam(doc.data().Team);

                    //display sprint heading

                    const sprintHeading = document.querySelector('#subPageHeading');

                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).get().then((doc) => {
                        let html = `<p>${doc.data().name}</p>`;
                        sprintHeading.innerHTML = html;
                    });

                    //display user stories

                    let userStoryHTML = '';
                    const storyListLink = document.querySelector('#userStoryContainer');
                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.exists) {
                                const name = doc.data().name;
                                const description = doc.data().description;
                                const acceptance = doc.data().acceptance;
                                const points = doc.data().points;
                                li = `<div class="userStory"><p class="userStoryName">${name}</p><p class="description">${description}</p><p class="acceptance">Acceptance: ${acceptance}</p><p class="points">Points: ${points}</p><button class="userStoryBtn" onclick="saveUserStoryID('${doc.id}')">View Tasks</button></div>`;
                                userStoryHTML = userStoryHTML + li;
                            } else {
                                console.log("user story doesnt exist");
                            }
                            storyListLink.innerHTML = userStoryHTML;
                        });
                    });

                    //git and links

                    const gitLink = document.querySelector('#gitLink');

                    let git = `<a href="${doc.data().repository}">Git</a>`;

                    gitLink.innerHTML = git;

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
                    console.log("project does not exist");
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