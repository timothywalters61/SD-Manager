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
 * Creates a document in the Projects collection with data as its content
 * @param {object} data
 */
function createProjectDocument(data) {
	return docs.addDoc('projects', data);
}
