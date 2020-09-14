//const { checkDateBeforeCurrentDate, checkIsNotANumber, isValidEmail, containsInput, isValidRepoLink } = require('../../../../testingCode/embeddedFunctions');

const createTask = document.querySelector("#Task-form");

createTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = createTask['TaskTitle'].value;
    const el = createTask['task-assign-to'].value;
    //const assigned_to = el.options[el.selectedIndex].value;
    console.log(name);
    console.log(el);

    db.collection('projects').doc(projectID).collection("backlog").doc(userStoryID).collection("tasks").add({
        name: name,
        assigned_to: el,
        status: "1"
    })
    .then((doc) => {
        return db.collection('projects').doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(userStoryID).collection("tasks").doc(doc.id).set({
            name: name,
            assigned_to: el,
            status: "1"
        });
    }).then(() => {
        createTask.reset();
        window.location.reload(true);
    });
});
