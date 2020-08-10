//save project to database

const create = document.querySelector("#create-form");
create.addEventListener('submit', (e) => {
    e.preventDefault();

    const projectName = create['projectName'].value;
    const projectDescription = create['projectDescription'].value;
    const gitLink = create['gitLink'].value;
    var user = auth.currentUser;

    console.log(projectName, " ", projectDescription);
    if (user) {
        db.collection("projects").add({
            OwnerID: user.uid,
            name: projectName,
            description: projectDescription,
            Team: [user.email],
            repository: gitLink,
            Sprints: null
        }).then(function (docRef) {
            //console.log(docRef.name);
            db.collection("users").doc(user.uid).update({
                projects: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
                .then(() => {
                    console.log("project created");
                    create.reset();
                    
                    localStorage.setItem("docID", docRef.id);
                    localStorage.setItem("ownerID", user.uid);
                    localStorage.setItem("docName", projectName);
                    window.location.href = "projectOwner.html";
                });
        }).catch(function (error) {
            console.log("error creating project: ", error);
        });

    } else {
        console.log("user does not exist");
    }
});