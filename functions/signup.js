/**
 * @author Simphiwe Zulu
 * @description This file contains all the Cloud Functions that handle the sign up
 *              feature of the platform
 */

const admin = require('firebase-admin');
const docs = require('./docs');
const errors = require('./errors');
const functions = require('firebase-functions');

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

/**
 * Returns a data object that will be used in a user's document in the
 * database
 * @param {string} acc_type
 * @param {string} email
 * @param {string} fname
 * @param {string} lname
 * @param {string} university
 * @param {string} university_id
 */
function createUserDocObject(
	acc_type,
	email,
	fname,
	lname,
	university,
	university_id
) {
	var data = {
		acc_type: acc_type,
		email: email,
		fname: fname,
		lname: lname,
		university: university,
		university_id: university_id
	};
	return data;
}

function writeTouserDocument(data, uid) {
	return docs.createDoc('users/' + uid, data);
}
