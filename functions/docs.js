/**
 * @description This file contains all functions that are related to documents
 *              in the Cloud Firestore database.
 */

const admin = require('firebase-admin');

exports.getDoc = ref => {
	return admin.firestore().doc(ref);
};
