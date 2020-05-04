/**
 * @description This file contains all functions that make use of Firebase Auth that
 *              can be used in other parts of the Cloud Functions.
 */

const admin = require('firebase-admin');

/* ============================ Export Functions =========================== */
/**
 * Gets user data for the user corresponding to a given uid
 * @param {String} uid The uid corresponding to the user whose data to fetch
 */
exports.getUser = (uid) => {
	return admin.auth().getUser(uid);
};

/**
 * Gets user data for the user corresponding to a given email
 * @param {String} email The email corresponding to the user whose data to
 *                          fetch.
 */
exports.getUserByEmail = (email) => {
	return admin.auth().getUserByEmail(email);
};

/**
 * Gets the user data for the user corresponding to a given phone number.
 * The phone number has to conform to the E.164 specification.
 * @param {String} phone The phone number corresponding to the user whose data
 *                          to fetch.
 */
exports.getUserByPhoneNumber = (phone) => {
	return admin.auth().getUserByPhoneNumber(phone);
};
