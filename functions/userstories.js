/**
 * @description This file contains all the functions that will be used to handle user
 *              stories that will be saved in the 'backlog'
 */
/* ===================================== Imports ====================================== */
const auth = require('./auth');
const docs = require('./docs');
const errors = require('./errors');
const functions = require('firebase-functions');
/* ===================================== Exports ====================================== */
/**
 * Creates a user story and saves it in the project's bakclog
 */
exports.createUserStory = functions.https.onCall((data, context) => {
	var acceptance = data.acc;
	var description = data.des;
	var points = data.pts;
	var projectid = data.pid;

	var data = createUserStoryDataObject(acceptance, description, points);

	return createNewUserStoryDocument(data, projectid).then((value) => {
		return { result: 'Success' };
	});
});
/* ================================== Local Functions ================================= */
/**
 * Returns a map of fields and values that will be used when creating a new user story
 * document
 * @param {String} acceptance
 * @param {String} description
 * @param {String} points
 */
function createUserStoryDataObject(acceptance, description, points) {
	return {
		acceptance: acceptance,
		description: description,
		points: points,
	};
}

/**
 * Creates a new user story document in a project's backlog subcollection.
 * The project is specified by projectid and the document will contain the
 * contents of data.
 * @param {Object} data
 * @param {String} projectid
 */
function createNewUserStoryDocument(data, projectid) {
	return docs.addDoc('projects/' + projectid + '/backlog', data);
}
