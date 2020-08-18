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
const userStoryID = localStorage.getItem("userStoryID");
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
        let heading = `<p>Project: ${projectName}</p>`;
        projectTitle.innerHTML = heading;

       

        db.collection("projects").doc(projectID)
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    //setUpTeam(doc.data().Team);

                    //display user story heading

                    const userStoryTitle = document.querySelector('#subPageHeading');

                    db.collection("projects").doc(projectID).collection("backlog").doc(userStoryID).get().then((doc) => {
                        let html = `<p>User Story: ${doc.data().name}</p>`;
                        userStoryTitle.innerHTML = html;
                    });

                    //display tasks

                    const taskList = document.querySelector("#taskContainer");
                    taskList.innerHTML = '';

                    let tasksIDs = new Map();


                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if(doc.exists){
                                const name = doc.data().name;
                                console.log(name);
                                tasksIDs.set(name, {id : doc.id}); // adds user story name and id to be used later


                                let wholeDiv;

                                wholeDiv = document.createElement('div');
                                wholeDiv.draggable = true;
                                wholeDiv.className = "stories";
                                
                                let n = document.createElement('p'); //name comp
                                n.className = "userStoryName"
                                n.innerText= name;

                                let btnDeleteUS = document.createElement('button'); // moves to task page
                                btnDeleteUS.className = "userStoryBtn";
                                btnDeleteUS.id = "btnDelete";
                                btnDeleteUS.innerText = "Delete";

                                wholeDiv.append(n);
                                wholeDiv.append(btnDeleteUS);

                                taskList.appendChild(wholeDiv);

                            }else{
                                console.log("none");
                            }

                        });
                        const stories = document.querySelectorAll('.stories');
                        console.log(tasksIDs);
                        for(let a = 0; a < stories.length;a++) {
                            const story = stories[a];

                            deleteButton = story.querySelector("#btnDelete");
                            deleteButton.addEventListener('click' , function(){
                                let usName = story.querySelector(".userStoryName").innerText;
                                let deleteID = tasksIDs.get(usName).id;
                                db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(deleteID).delete().then(function() {
                                    console.log("Document successfully deleted!");
                                    window.location.href = "Task.html";
                                }).catch(function(error) {
                                    console.error("Error removing document: ", error);
                                });
                                console.log(deleteID);
                            });
                        }
                    
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