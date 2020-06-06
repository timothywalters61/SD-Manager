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

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        //console.log(data);

        //back button

        // const backButton = document.querySelector("#backButton");
        // backButton.addEventListener('click', () => {
        //     window.location.href = "Sprint.html";
        // });

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

        //set up sidenav

        var data = [user.displayName, user.email];
        setUpSideNav(data);

        //populate team dropdown

        db.collection("projects").doc(projectID)
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    setUpTeam(doc.data().Team);

                    //display user story heading

                    const userStoryTitle = document.querySelector('#Title');

                    db.collection("projects").doc(projectID).collection("backlog").doc(userStoryID).get().then((doc) => {
                        let html = `<p>${doc.data().name}: ${doc.data().description}</p>`;
                        userStoryTitle.innerHTML = html;
                    });

                    //display tasks

                    const taskList = document.querySelector("#taskList");
                    let taskListHTML = '';
                    taskList.style = "background-color: #ECEFF1";
                    taskList.style.width = "1000px";
                    taskList.style.marginLeft = "auto";
                    taskList.style.marginRight = "auto";
                    taskList.style.borderRadius = "20px";
                    // taskList.style.color = "#121212";

                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const li = `
                            <li>           
                                <h3>${doc.data().name}</h3>
                            </li>
                            `;
                            taskListHTML = taskListHTML + li;
                            console.log("created");
                        });
                        if (taskListHTML.length === 0) {
                            console.log("no tasks");
                        } else {
                            taskList.innerHTML = taskListHTML;
                        }
                    });

                    //git and links

                    const gitLink = document.querySelector('#gitLink');

                    let git = `<a href="${doc.data().repository}">Git</a>`;

                    gitLink.innerHTML = git;

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