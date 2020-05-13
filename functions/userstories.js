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
