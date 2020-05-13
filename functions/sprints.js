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
