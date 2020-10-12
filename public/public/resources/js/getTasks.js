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
const userStoryID = localStorage.getItem("userStoryID");
console.log(userStoryID);



// display pending invites
auth.onAuthStateChanged(user => {

    if (user) {

        db.collection("users").doc(user.uid).get().then(function(doc) {
            let notifs = doc.data().notifications;
            console.log(notifs.length);
    
            let notifBadge = document.getElementById('notifications');
            notifBadge.innerText = notifs.length +" Notifications";
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        
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

        //update add task form to allow allocation to team members

        db.collection("projects").doc(projectID).get().then(function (doc) {
            let array = doc.data().Team;
            array.forEach(email => {
                addMemberToSelect(email);
            });
        });

        db.collection("projects").doc(projectID).get().then(function (doc) {
            let array = doc.data().Team;
            array.forEach(email => {
                addEditMemberToSelect(email);
            });
        });

        //Drag & Drop Code

        const NS = document.getElementById("ns-tasks");
        const IP = document.getElementById("ip-tasks");
        const C = document.getElementById("c-tasks");

        let wholeDiv;
        let taskIDs = new Map();

        //get tasks from db

        db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                let taskName = doc.data().name;
                let taskAssigned = doc.data().assigned_to;
                let status = parseInt(doc.data().status);
                console.log(status);

                taskIDs.set(taskName, {
                    id: doc.id
                });

                let wholeDiv = document.createElement('div');
                wholeDiv.draggable = true;
                wholeDiv.className = "tasks";

                let n = document.createElement('p'); //name comp
                n.className = "userStoryName";
                n.innerText = taskName;
                n.style.marginBottom = "15px";

                let des = document.createElement('p'); //description comp
                des.className = "acceptance";
                des.innerText = taskAssigned;

                let btnDeleteUS = document.createElement('button'); // moves to task page
                btnDeleteUS.className = "userStoryBtn";
                btnDeleteUS.id = "btnDelete";
                btnDeleteUS.innerText = "Delete"
                btnDeleteUS.style.float = "right";
                btnDeleteUS.style.marginLeft="30px";

                let btnEditUS = document.createElement('button'); // moves to task page
                btnEditUS.className = "userStoryBtn";
                btnEditUS.id = "btnEdit";
                btnEditUS.innerText = "Edit"
                btnEditUS.style.float = "left";
                btnEditUS.style.marginRight="30px";


                wholeDiv.appendChild(n);
                wholeDiv.appendChild(des);
                wholeDiv.appendChild(btnDeleteUS);
                wholeDiv.appendChild(btnEditUS);

                // attaches user story to the relevant column
                // 1 : not started
                // 2 : in progress
                // 3 : completed
                if (status === 1) {
                    console.log("in 1");

                    NS.appendChild(wholeDiv);
                } else if (status === 2) {
                    console.log("in 2");
                    IP.appendChild(wholeDiv);
                } else if (status === 3) {
                    C.appendChild(wholeDiv);
                } else {
                    NS.appendChild(wholeDiv);
                }

            });


            const tasks = document.querySelectorAll('.tasks');
            const categories = document.querySelectorAll('.categories');

            let dragTask = null;

            for (let a = 0; a < tasks.length; a++) {
                const task = tasks[a];

                let deleteT = task.querySelector("#btnDelete");
                deleteT.addEventListener('click', function () {
                    let name = task.querySelector(".userStoryName").innerText;
                    let deleteID = taskIDs.get(name).id;
                    db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(deleteID).delete().then(function () {
                        console.log("Document successfully deleted!");
                        window.location.href = "Task.html";
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });
                    console.log(deleteID);
                });

                let editTask = task.querySelector("#btnEdit");
                editTask.addEventListener('click', function () {

                    let name = task.querySelector(".userStoryName").innerText;
                    let assignedMember = task.querySelector(".acceptance").innerText;
                    console.log(assignedMember);

                    var editTaskTitle = document.querySelector('#editTaskTitle');
                    editTaskTitle.value = name;

                    var editTaskAssignTo = document.querySelector('#editTask-assign-to');
                    editTaskAssignTo.value = assignedMember;

                    let editID = taskIDs.get(name).id;
                    console.log(editID);
                    showEditTaskForm();
                    const editTask = document.querySelector("#editTask-form");
                    editTask.addEventListener('submit', (e) => {
                        e.preventDefault();

                        const editedMember = editTask['editTask-assign-to'].value;
                        const editedTaskName = editTask['editTaskTitle'].value;
                        console.log(editedMember);
                        db.collection('projects').doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(editID).update({
                            name: editedTaskName,
                            assigned_to: editedMember
                        }).then(() => {
                            editTask.reset();
                            window.location.reload(true);
                        });
                    });
                });


                // when story is starting to drag
                task.addEventListener('dragstart', function () {
                    console.log("You are dragging an item");
                    dragTask = task;
                    setTimeout(function () {

                        task.style.display = 'none';

                    }, 0);
                });

                // when story is stopping drag
                task.addEventListener('dragend', function () {
                    console.log("You are no longer dragging an item");
                    setTimeout(function () {

                        task.style.display = 'block';
                        dragTask = null;

                    }, 0);
                });

                for (let b = 0; b < categories.length; b++) {
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

                    category.addEventListener('drop', function (ev) {

                        category.appendChild(dragTask);
                        this.style.backgroundColor = 'whitesmoke';

                        let parentID = dragTask.parentElement.id;

                        let name = dragTask.querySelector('.userStoryName').innerText;
                        let taskID = taskIDs.get(name).id;
                        console.log(taskID, " task id");

                        console.log(parentID, " parent id");

                        console.log("should change status now");
                        if (parentID == "NotStarted") {
                            console.log(parentID, "1", "   status change");
                            db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(taskID).update({
                                status: "1"
                            }).then(function () {
                                //window.location.href = "Task.html";
                            });
                        } else if (parentID == "InProgress") {
                            console.log(parentID, "2", "   status change");
                            db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(taskID).update({
                                status: "2"
                            }).then(function () {
                                //window.location.href = "Task.html";
                            });

                        } else if (parentID == "Completed") {
                            console.log(parentID, "3", "   status change");
                            db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(taskID).update({
                                status: "3"
                            }).then(function () {
                                //window.location.href = "Task.html";
                            });

                        }

                    })

                }

            }
        });
    } else {
        console.log("user logged out");
        window.location.href = "index.html";
    }

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

const addMemberToSelect = email => {
    const select = document.querySelector('#task-assign-to')
    db.collection('users').where('userEmail', '==', email).onSnapshot(query => {
        if (!query.empty) {
            query.docs.forEach(doc => {
                var username = doc.data().userDisplayName;
                select.innerHTML += `<option value="${username}">${username}</option>`;
            })
        }
    })
}

const addEditMemberToSelect = email => {
    const select = document.querySelector('#editTask-assign-to')
    db.collection('users').where('userEmail', '==', email).onSnapshot(query => {
        if (!query.empty) {
            query.docs.forEach(doc => {
                var username = doc.data().userDisplayName;
                select.innerHTML += `<option value="${username}">${username}</option>`;
            })
        }
    })
}