/**
 * @description This file contains all the functions that will be used to handle tasks that will be saved in the 'backlog'
 */
/* ===================================== Imports ====================================== */
const auth = require('./auth');
const docs = require('./docs');
const errors = require('./errors');
const functions = require('firebase-functions');
/* ===================================== Exports ====================================== */
/**
 * Creates a task and saves it in the project's bakclog
 */
exports.createTask = functions.https.onCall((data, context) => {
	var userStory = data.uS;
	var projectid = data.pid;

	var data = createTaskDataObject(projectid, userStory);

	return createNewTaskDocument(data, projectid).then((value) => {
		return { result: 'Success' };
	});
});

exports.displayTasks = functions.https.onCall((data, context) => {
	var userStory = data.uS;
	var projectid = data.pid;

	var data = displayTasksDataObject(projectid, userStory);

	return displayTasksDocument(data, projectid).then((value) => {
		return { result: 'Success' };
	});
});
/* ================================== Local Functions ================================= */
/**
 * Returns a map of fields and values that will be used when creating a new task
 * document
 * @param {String} userStory
 * @param {String} projectid
 * @param {String} sprintID
 */
function createTaskDataObject(userStory, projectid, sprintID) {
	return {
		userStory: userStory,
		projectid: projectid,
		sprintID: sprintID,
	};
}

function getTaskDataObject(id) {
	return {
		sprintID: id
	};
}

/**
 * Creates a new task document in a project's backlog subcollection.
 * The project is specified by projectid and the document will contain the
 * contents of data.
 * @param {Object} data
 * @param {String} projectid
 */
function createNewTaskDocument(data, projectid) {
	return docs.addDoc('projects/' + projectid + '/backlog', data);
}

function getTasksDocument(data, projectid) {
	return docs.getCollection('projects/' + projectid + '/backlog', data);
}