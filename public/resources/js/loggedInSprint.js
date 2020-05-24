const auth = firebase.auth();
const db = firebase.firestore();
const projectID = localStorage.getItem("docID");
const ownerID = localStorage.getItem("ownerID");
const currentSprintID = localStorage.getItem("currentSprintID");

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
        //console.log(data);

        //back button

        const backButton = document.querySelector("#backButton");
        backButton.addEventListener('click', () => {
            if (user.uid === ownerID) {
                window.location.href = "projectOwner.html";
            } else {
                window.location.href = "projectDeveloper.html";
            }
        });

        //only team members can open this page

        db.collection("projects").doc(projectID)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.data().team.includes(user.email)) {
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
                    setUpTeam(doc.data().team);

                    //display sprint heading

                    const sprintHeading = document.querySelector('#Title');

                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).get().then((doc) => {
                        let html = `<p>${doc.data().name}</p>`;
                        sprintHeading.innerHTML = html;
                    });

                    //display user stories

                    let userStoryHTML = '';
                    const storyListLink = document.querySelector('#userStoryList');
                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.exists) {
                                const name = doc.data().name;
                                const description = doc.data().description;
                                const acceptance = doc.data().acceptance;
                                const points = doc.data().points;
                                displayUserStoryAsCard(name, description, acceptance, points, doc.id);
                            } else {
                                console.log("user story doesnt exist");
                            }
                        });
                        // querySnapshot.forEach((doc) => {
                        //     const li = `
                        //     <li><a href="Task.html" onclick="saveUserStoryID('${doc.id}')">           
                        //         <h3>${doc.data().name}</h3>
                        //             <p>${doc.data().description}</p>
                        //     </a></li>
                        //     `;
                        //     userStoryHTML = userStoryHTML + li;
                        // });
                        // if (userStoryHTML.length === 0) {
                        //     console.log("no user story");
                        // } else {
                        //     storyListLink.innerHTML = userStoryHTML;
                        // }
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