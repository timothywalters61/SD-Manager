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

// get required values from local storage
const auth = firebase.auth();
const db = firebase.firestore();
const projectID = localStorage.getItem("docID");
const ownerID = localStorage.getItem("ownerID");
const currentSprintID = localStorage.getItem("currentSprintID");
const projectName = localStorage.getItem("docName");

const projectTitle = document.querySelector("#PageHeading");
let heading = `<p>Project: ${projectName}</p>`;
projectTitle.innerHTML = heading;

const sprintHeading = document.querySelector('#subPageHeading');
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).get().then((doc) => {
    let html = `<p>Sprint: ${doc.data().name}</p>`;
    sprintHeading.innerHTML = html;
});

const gitLink = document.querySelector('#gitLink');
db.collection("projects").doc(projectID)
    .onSnapshot(function (doc) {
        let git = `<a href="${doc.data().repository}">Git</a>`;
        gitLink.innerHTML = git;
    });

// display pending invites
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


// logout
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

//Drag & Drop Code

const NS = document.getElementById("NotStarted");
const IP= document.getElementById("In Progress");
const C = document.getElementById("Completed");

let wholeDiv;
let userIDs = new Map();

const tasks = document.querySelectorAll('.tasks');
const categories = document.querySelectorAll('.categories');

let dragTask= null;

for(let a = 0; a < tasks.length;a++) {
 const task = tasks[a];

    // when story is starting to drag
    task.addEventListener('dragstart', function() {
        console.log("You are dragging an item");
        dragTask = task;
        setTimeout(function () {

            task.style.display = 'none';

        },0);
    });

    // when story is stopping drag
    task.addEventListener('dragend',function () {
        console.log("You are no longer dragging an item");
        setTimeout(function () {

            task.style.display = 'block';
            dragTask=null;

        },0);
    });

    for (let b = 0; b < categories.length;b++) {
        const category = categories[b];

        category.addEventListener('dragover', function (e) {

            e.preventDefault();

        });

        category.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = '#778899';

        });

        category.addEventListener('dragleave', function () {
            this.style.backgroundColor = 'whitesmoke';

        })

        category.addEventListener('drop',function (ev) {

            category.appendChild(dragTask);
            this.style.backgroundColor = 'whitesmoke';
        })

    }

}