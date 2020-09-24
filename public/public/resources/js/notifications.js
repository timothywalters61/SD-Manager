function getNotifications(){
    console.log("notifs");
    let user = auth.currentUser; 
    console.log(user);
    let notifs;
    db.collection("users").doc(user.uid).get().then(function(doc){

        notifs = doc.data().notifications;
        console.log(notifs);
        localStorage.setItem("notifications" , notifs);

       /* const notifDiv = document.getElementById("Notifications");

        
        for(let i = 0; i < notifs.length; i++){
            console.log(notifs[i]);

            let nDiv = document.createElement("div");
            nDiv.innerText = notifs[i];
            notifDiv.appendChild(nDiv);

        }*/
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}

function addSprintNotif(sprintName){
    console.log("in");
    let notif = sprintName + " is a new sprint in project " + projectName;
    let projTeam;
    db.collection("projects").doc(projectID).get().then(function(doc){
        
        projTeam = doc.data().Team;
        console.log(projTeam[0]);

        for(let i = 0 ; i < projTeam.length; i++){
            db.collection("users").where("userEmail", "==" , projTeam[i]).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    notifUser = doc.id;
                    console.log(doc.id, " => ", doc.data());

                    db.collection("users").doc(notifUser).update({
                        notifications: firebase.firestore.FieldValue.arrayUnion(notif)
                    })
                    .then(() => {
                        console.log("sprint notif added");
                        window.location.href = "dragDrop.html";
                    });
                });
            });
        }

    });
}

function addStoryNotif(storyName){
    let notif = storyName + " is a new user story in project " + projectName;
    console.log(notif)
    let projTeam;
    db.collection("projects").doc(projectID).get().then(function(doc){
        
        projTeam = doc.data().Team;
        console.log(projTeam[0]);

        for(let i = 0 ; i < projTeam.length; i++){
            db.collection("users").where("userEmail", "==" , projTeam[i]).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    notifUser = doc.id;
                    console.log(doc.id, " => ", doc.data());

                    db.collection("users").doc(notifUser).update({
                        notifications: firebase.firestore.FieldValue.arrayUnion(notif)
                    })
                    .then(() => {
                        console.log("sprint notif added");
                        //window.location.href = "projectOwner.html";
                    });
                });
            });
        }

    });
}

function addTaskNotif(taskName){
    let user = auth.currentUser; 
    let notif = taskName + " is a new task in project " + projectName;
    let projTeam;
    db.collection("projects").doc(projectID).get().then(function(doc){
        
        projTeam = doc.data().Team;
        console.log(projTeam[0]);

        for(let i = 0 ; i < projTeam.length; i++){
            db.collection("users").where("userEmail", "==" , projTeam[i]).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    notifUser = doc.id;
                    console.log(doc.id, " => ", doc.data());

                    db.collection("users").doc(notifUser).update({
                        notifications: firebase.firestore.FieldValue.arrayUnion(notif)
                    })
                    .then(() => {
                        console.log("sprint notif added");
                        //window.location.href = "projectOwner.html";
                    });
                });
            });
        }

    });
  
}