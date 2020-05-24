/**
 * @description Creates all the functions that will be used in the sprints section
 * of the platform
 */

 /**
 * Creates a new sprint
 * @param {DocumentSnapshot} snap 
 */
function createSprintButton(snap) {
	var data = snap.data()
	var btn = document.createElement('li');
	btn.innerHTML = `<a href="SprintPage.html" onclick="saveSprintRef(${snap.id})">${data.name}</a>`;
	var sprints = document.getElementById('sprintList');
	sprints.appendChild(btn);
}

/**
 * Returns a map of fields and values that will be used to save a sprint
 * @param {String} name 
 * @param {String} start 
 * @param {String} end 
 */
function createSprintData(name, start, end) {
    start = new Date(start);
    end = new Date(end);
    return {
        end_date: end,
        name: name,
        start_date: start,
    };
}

/**
 * Creates a new sprint document in a project's sprints subcollection
 * @param {String} projectid 
 * @param {Object} data 
 */
function createSprintDocument(projectid, data) {
    return addDoc('projects/' + projectid + '/sprints', data)
}
