const createTask = document.querySelector("#Task-form");

createTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = createTask['TaskTitle'].value;

    db.collection('projects').doc(projectID).collection("backlog").doc(userStoryID).collection("tasks").add({
        name: name
    })
    .then((doc) => {
        db.collection('projects').doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(doc.id).set({
            name: name
        }).then(() => {
            alert("task added to user story");
            createTask.reset();
            window.location.reload(true);
        });
    });
});