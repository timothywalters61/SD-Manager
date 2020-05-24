/**
 * @description This file contains all the code that will be used to create a new sprint
 */

var sprint = document.querySelector('#create-sprint-form');
sprint.addEventListener('submit', (e) => {
    e.preventDefault()
    var name = sprint['sprintName'].value;
    var start = sprint['startDate'].value;
    var end = sprint['dueDate'].value;

    var data = createSprintData(name, start, end);
    console.log(data)
    createSprintDocument(projectID, data).then((value) => {
        alert("Sprint created");
    }).catch(error => {
        alert("Sprint could not be created due to an error:", error);
    })
});