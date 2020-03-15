/**
 * @description This file contains all the functions that use the 'projects' document in
 *              the database.
 */

const admin = require('firebase-admin');
const docs = require('./docs');
const errors = require('./errors');
const functions = require('firebase-functions');

/* =========================================== Exports ============================================= */

/* ========================================= Local Functions ======================================= */
/**
 * Creates a project document in a user's projects subcollection
 * @param {string} projectid
 * @param {string} projectName
 * @param {string} projectDescription
 * @param {string} projectRole
 * @param {string} uid
 */
function addProjectToUserDocument(
	projectid,
	projectName,
	projectDescription,
	projectRole,
	uid
) {
	var data = {
		name: projectName,
		description: projectDescription,
		role: projectRole
	};

	return docs.createDoc('users/' + uid + '/projects/' + projectid, data);
}

/**
 * Creates a document in the Projects collection with data as its content
 * @param {object} data
 */
function createProjectDocument(data) {
	return docs.addDoc('projects', data);
}
