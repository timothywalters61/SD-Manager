/**
 * @description This file contains all functions that are related to documents
 *              in the Cloud Firestore database.
 */

const admin = require('firebase-admin');

/**
 * Creats a new document in the collection specified by 'ref'
 * Returns a promise with the document's metadata upon completion
 * @param {String} ref
 * @param {object} data
 */
exports.addDoc = (ref, data) => {
	return admin.firestore().collection(ref).add(data);
};

/**
 * Creates a new document at 'ref' that contains the data object in the database.
 * Returns a promise with the document's metadata upon completion
 * @param {String} ref
 * @param {object} data
 */
exports.createDoc = (ref, data) => {
	return admin.firestore().doc(ref).create(data);
};

/**
 * Deletes the document referred to by ref
 * @param {String} ref
 */
exports.deleteDoc = (ref) => {
	return admin.firestore().doc(ref).delete();
};

/**
 * Returns a promise with a snapshot of a collection specified by ref
 * @param {String} ref
 */
exports.getCollection = (ref) => {
	return admin.firestore().collection(ref).get();
};

/**
 * Returns a promise with a snapshot of a document specified by ref
 * @param {String} ref
 */
exports.getDoc = (ref) => {
	return admin.firestore().doc(ref).get();
};
