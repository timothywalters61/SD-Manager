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
            owner_id: user.uid,
            name: projectName,
            description: projectDescription,
            team: [user.email],
            repository: gitLink,
            sprints: null
        }).then(function (docRef) {
            db.collection("users").doc(user.uid).update({
                projects: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
                .then(() => {
                    console.log("project created");
                    alert("project created");
                    create.reset();
                    localStorage.setItem("docID", docRef.id);
                    localStorage.setItem("ownerID", user.uid);
                    window.location.href = "projectOwner.html";
                });
        }).catch(function (error) {
            console.log("error creating project: ", error);
        });

    } else {
        console.log("user does not exist");
    }
});