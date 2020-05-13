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
 * @param {String} repository
 */
function createProjectDocumentDataObject(name, description, repository) {
	return {
		description: description,
		name: name,
		repository: repository,
	};
}

/**
 * Creates a project document in the projects collection
 * @param {Object} data
 */
function createProjectDocument(data) {
	return firestore.collection('projects').add(data);
}
