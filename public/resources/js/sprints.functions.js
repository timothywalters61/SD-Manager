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
	btn.innerHTML = `<a href="SprintPage.html" onclick="saveSprintRef(${snap.id})">${data.name}</a>`
	var sprints = document.getElementById('sprintList');
	sprints.appendChild(btn);
}
