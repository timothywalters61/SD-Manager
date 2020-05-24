/**
 * @description This file contains all the code taht will be used in the projects
 *              section.
 */

/**
 * Returns a map of fields and values that will be used to create a member document
 * in a project's members subcollection.
 * @param {String} email
 * @param {String} name
 * @param {String} role
 */
function createProjectMemberDataObject(email, name, role) {
	return {
		email: email,
		name: name,
		role: role,
	};
}

/**
 * Returns a map of field and value pairs that will be used to create a project
 * document.
 * @param {String} name
 * @param {String} description
 * @param {String} owner
 * @param {String} repository
 * @param {Array} team
 */
function createProjectDocumentDataObject(
	name,
	description,
	owner,
	repository,
	team
) {
	return {
		description: description,
		name: name,
		owner_id: owner,
		repository: repository,
		team: team,
	};
}

/**
 * Creates a project document in the projects collection
 * @param {Object} data
 */
function createProjectDocument(data) {
	return addDoc('projects', data);
}

/**
 * Creates a document in the invites subcollection of a project specified by
 * pid which will contain the contents of data
 * @param {Object} data
 * @param {String} pid
 * @param {String} uid
 */
function createProjectInviteDocument(data, pid, uid) {
	return setDoc('projects/' + pid + '/invites/', data, uid);
}

/**
 * Creates a member document in a project's members subcollection that will
 * contain the contents of data
 * @param {Object} data
 * @param {String} pid
 * @param {String} uid
 */
function createProjectMemberDocument(data, pid, uid) {
	return setDoc('projects/' + pid + '/members/', data, uid);
}

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

/**
 * Returns a map of fields and values that will be used in a user's projects
 * subcollection to create a project document
 * @param {String} description
 * @param {String} name
 * @param {String} role
 */
function createUserProjectDataObject(description, name, role) {
	return {
		description: description,
		name: name,
		role: role,
	};
}

/**
 * Creates a project document in a user's invites subcollection which will
 * contain the content of data.
 * @param {Object} data
 * @param {String} pid
 * @param {String} uid
 */
function createUserInviteDocument(data, pid, uid) {
	return setDoc('users/' + uid + '/invites/', data, pid);
}

/**
 * Creates a project document in a user's projects subcollection that will
 * store the contents of data
 * @param {Object} data
 * @param {String} pid
 * @param {String} uid
 */
function createUserProjectDocument(data, pid, uid) {
	return setDoc('users/' + uid + '/projects', data, pid);
}