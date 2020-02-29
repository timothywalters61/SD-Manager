/**
 * @description This file contains all functions that are related to documents
 *              in the Cloud Firestore database.
 */

const admin = require('firebase-admin');

/**
 * Returns a promise with a snapshot of a document specified by ref
 * @param {String} ref
 */
exports.getDoc = ref => {
	return admin.firestore().doc(ref);
};
