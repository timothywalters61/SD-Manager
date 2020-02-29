/**
 * @description This file contains functions that will be used to create error
 *              objects to be returned to the front end.
 */

exports.invalidCustomClaim = () => {
	var error = {
		code: 'failed-precondition',
		message: "User's account type must be specified",
		details: ''
	};

	return createHttpErrorObject(error);
};

function createHttpErrorObject(error) {
	return new functions.https.HttpsError(
		error.code,
		error.message,
		error.details
	);
}
