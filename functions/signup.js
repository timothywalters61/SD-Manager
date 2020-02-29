/**
 * @author Simphiwe Zulu
 * @description This file contains all the Cloud Functions that handle the sign up
 *              feature of the platform
 */

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const errors = require('./errors');

/* ===================================== Exports ====================================== */

exports.signup = functions.https.onCall((data, context) => {
	var acc_type = data.ac;
	var email = data.em;
	var fname = data.fn;
	var lname = data.ln;
	var password = data.pa;
	var university_id = data.un_id;
	var university = data.un;

	return createNewUser(email, fname, lname, password);
});

/* ================================== Local Functions ================================= */
/**
 * Creates a new user account and returns a promise when complete
 * @param {string} email
 * @param {string} fname
 * @param {string} lname
 * @param {string} password
 */
function createNewUser(email, fname, lname, password) {
	return admin
		.auth()
		.createUser({
			email: email,
			emailVerified: false,
			displayName: fname + ' ' + lname,
			password: password,
			disabled: false
		})
		.then(user => {
			return { uid: user.uid };
		});
}

/**
 * Returns a custom user claim object based on the account type chosen
 * @param {string} acc_type
 */
function createUserClaimObject(acc_type) {
	var claim = {
		student: false,
		tutor: false,
		lecturer: false
	};

	if (acc_type == 'student') {
		claim.student = true;
	} else if (acc_type == 'tutor') {
		claim.tutor = true;
	} else if (acc_type == 'lecturer') {
		claim.lecturer = true;
	} else {
		return Promise.reject(errors.invalidCustomClaim);
	}

	return claim;
}
