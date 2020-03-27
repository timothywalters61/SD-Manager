//save project to database

const create = document.querySelector("#create-form");
create.addEventListener('submit', (e) => {
    e.preventDefault();

    const projectName = create['projectName'].value;
    const projectDescription = create['projectDescription'].value;
    var user1 = auth.currentUser;

    console.log(projectName, " ", projectDescription);
    if (user1) {
        var newProjectRef = db.collection("Projects").doc();
        newProjectRef.set({
            OwnerID: user1.uid,
            ProjectName: projectName,
            ProjectDescription: projectDescription,
            Team: [user1.email]
        }).then(function () {
            console.log("project created");
            alert("project created");
            create.reset();
            localStorage.setItem("docID", newProjectRef.id);
            window.location.href = "projectOwner.html";
        }).catch(function (error) {
            console.log("error creating project: ", error);
        });

    } else {
        console.log("user does not exist");
    }
});