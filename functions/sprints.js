/**
 * @description This file contains all functions that interact with the sprint documents
 *              in the 'sprints' collection
 */
/* ===================================== Imports ====================================== */
const auth = require('./auth');
const docs = require('./docs');
const errors = require('./errors');
const functions = require('firebase-functions');
/* ===================================== Exports ====================================== */
/**
 * Creates a new sprint document in a project's sprints subcollection
 */
exports.createSprint = functions.https.onCall((data, context) => {
	var end = data.end;
	var name = data.nam;
	var projectid = data.pid;
	var start = data.sta;

	var data = createSprintDataObject(end, name, start);

	return createSprintDocument(data, projectid).then((value) => {
		return { result: 'Success' };
	});
});
/* ================================== Local Functions ================================= */
/**
 * Returns a map of field and values that will be when creating a new sprint document.
 * @param {*} end
 * @param {String} name
 * @param {*} start
 */
function createSprintDataObject(end, name, start) {
	return {
		end_date: end,
		name: name,
		start_date: start,
	};
}

/**
 * Creates a sprint document in a project's sprints subcollection. The document
 * will contain the contents of data.
 * @param {Object} data
 * @param {String} projectid
 */
function createSprintDocument(data, projectid) {
	return docs.addDoc('projects/' + projectid + '/sprints', data);
}
