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

let userStoryHTML = '<h2 id = "NS">Not Started</h2>';
const storyListLink = document.querySelector('#NotStarted'); // object representing that div
                    
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists) {
            const name = doc.data().name;
            console.log(name);
            const description = doc.data().description;
            console.log(description);
            const acceptance = doc.data().acceptance;
            console.log(acceptance);
            const points = doc.data().points;
            console.log(points);
            li = `<div class="userStory" draggable = "true"><p class="userStoryName">${name}</p><p class="description">${description}</p><p class="acceptance">Acceptance: ${acceptance}</p><p class="points">Points: ${points}</p><button class="userStoryBtn" onclick="saveUserStoryID('${doc.id}')">View Tasks</button></div>`;
            userStoryHTML = userStoryHTML + li;
        } else {
            console.log("user story doesnt exist");
        }
        storyListLink.innerHTML = userStoryHTML;
    });
});