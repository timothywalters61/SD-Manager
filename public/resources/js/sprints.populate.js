/**
 * @description Populates the SprintsPage.html file with data
 */
const projectID = localStorage.getItem('docID');
const sprintID = localStorage.getItem('sprintID')
getDocumentReference(`projects/${projectID}/sprints/${sprintID}`).onSnapshot((snapshot)=> {

}).catch((error) =>
    alert('Could not retrive user story due to an error', error)
);