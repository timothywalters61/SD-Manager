function getNotifications(){
    console.log("notifs");
    
}

function addSprintNotif(sprintName){
    let user = auth.currentUser; 
    let notif = sprintName + " is a new sprint in project " + projectName;
    console.log(notif)

    db.collection("users").doc(user.uid).update({
        notifications: firebase.firestore.FieldValue.arrayUnion(notif)
    })
    .then(() => {
        console.log("sprint notif added");
        //window.location.href = "projectOwner.html";
    });
}

function addStoryNotif(storyName){
    let user = auth.currentUser; 
    let notif = storyName + " is a new user story in project " + projectName;
    console.log(notif)

    db.collection("users").doc(user.uid).update({
        notifications: firebase.firestore.FieldValue.arrayUnion(notif)
    })
    .then(() => {
        console.log("story notif added");
        //window.location.href = "projectOwner.html";
    });
}

function addTaskNotif(taskName){
    let user = auth.currentUser; 
    let notif = taskName + " is a new task in project " + projectName;
    console.log(notif)

    db.collection("users").doc(user.uid).update({
        notifications: firebase.firestore.FieldValue.arrayUnion(notif)
    })
    .then(() => {
        console.log("task notif added");
        //window.location.href = "projectOwner.html";
    });
}