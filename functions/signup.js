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
exports.createUserDocument = functions.https.onCall((data, context) => {
	// get variables from data object
	var acc_type = data.ac;
	var email = data.em;
	var fname = data.fn;
	var lname = data.ln;
	var university_id = data.un_id;
	var university = data.un;
	var uid = context.auth.uid;

	var data = createUserDocObject(
		acc_type,
		email,
		fname,
		lname,
		university,
		university_id
	);
	console.log('Creating user document...');
	return writeToUserDocument(data, uid).then(value => {
		console.log('Document created...');
		console.log('Setting custom user claim object...');
		return setUserClaimObject(acc_type, uid);
	});
});

/**
 * Creates a new user account and document in the users collection
 */
exports.signup = functions.https.onCall((data, context) => {
	// get variables from data object
	var acc_type = data.ac;
	var email = data.em;
	var fname = data.fn;
	var lname = data.ln;
	var password = data.pa;
	var university_id = data.un_id;
	var university = data.un;

	return createNewUser(email, fname, lname, password)
		.then(value => {
			var doc = createUserDocObject(
				acc_type,
				email,
				fname,
				lname,
				university,
				university_id
			);
			return {
				result: writeToUserDocument(doc, value.uid),
				uid: value.uid
			};
		})
		.then(result => {
			return setUserClaimObject(acc_type, result.uid);
		});
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
 * Sets the Custom User Claims object of a user specified by uid
 * @param {string} acc_type
 * @param {string} uid
 */
function setUserClaimObject(acc_type, uid) {
	var claim = {
		developer: false,
		client: false
	};

	if (acc_type == 'developer') {
		claim.developer = true;
	} else if (acc_type == 'client') {
		claim.client = true;
	} else {
		return Promise.reject(errors.invalidCustomClaim);
	}

	return admin.auth().setCustomUserClaims(uid, claim);
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

/**
 * creates a new document in the users collection in the database.
 * Returns a promise with the document metadata upon completion.
 * @param {string} data
 * @param {string} uid
 */
function writeToUserDocument(data, uid) {
	return docs.createDoc('users/' + uid, data);
}
