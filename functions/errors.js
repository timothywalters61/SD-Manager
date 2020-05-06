/**
 * @description This file contains functions that will be used to create error
 *              objects to be returned to the front end.
 */

const functions = require('firebase-functions');

/* ============================ Export Functions =========================== */
/**
 * Used when a document does not exist
 * @returns {HttpsError} error object that includes the error, message and details
 */
exports.docDoesNotExist = () => {
	var error = {
		code: 'not-found',
		message: 'Document Not Found',
		details: '',
	};
	return createHttpErrorObject(error);
};

exports.onError = (error) => {
	throw error;
};

exports.invalidCustomClaim = () => {
	var error = {
		code: 'failed-precondition',
		message: "User's account type must be specified",
		details: '',
	};

	return createHttpErrorObject(error);
};

/* ============================ Local Functions ============================ */
/**
 * Returns a HttpsError object
 * @param {Object} error
 */
function createHttpErrorObject(error) {
	return new functions.https.HttpsError(
		error.code,
		error.message,
		error.details
	);
}
