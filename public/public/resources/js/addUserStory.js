//const { checkDateBeforeCurrentDate, checkIsNotANumber, isValidEmail, containsInput, isValidRepoLink } = require('../../../../testingCode/embeddedFunctions');

const addStory = document.querySelector("#userStory-form");

let pointTot;
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).get().then(function (doc) {
    
        pointTot = doc.data().pointTotal;

    
});

addStory.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = addStory['storyTitle'].value;
    const description = addStory['storyDescription'].value;
    const acceptance = addStory['Acceptance'].value;
    const points = addStory['points'].value;
    const status = 1;//addStory['status'].value;
    console.log(status);

    pointTot = parseInt(pointTot, 10) + parseInt(points, 10);
    console.log(pointTot);

    //if (containsInput(title) == true && checkIsNotANumber(points) == false && containsInput(description) == true && containsInput(acceptance) == true) {

        
        db.collection("projects").doc(projectID).collection("backlog").add({
            name: title,
            description: description,
            acceptance: acceptance,
            SprintID: currentSprintID,
            points: points,
            status: status

        }).then((doc) => {
            db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(doc.id)
                .set({
                    name: title,
                    description: description,
                    acceptance: acceptance,
                    SprintID: currentSprintID,
                    points: points,
                    status: status
                }).then(() => {
                    addStory.reset();
                    window.location.reload(true);
                });
        }).then((doc => {
            db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).update({
                pointTotal: pointTot
            })

        }));
    //}
});