/**
 * @description This file contains all the functions that will be used to handle Cloud
 *              Firestore functionality
 */

/**
 * Adds a new document to a collection specified by ref that will store the contents
 * of data
 * @param {String} ref
 * @param {Object} data
 */
function addDoc(ref, data) {
	return firestore.collection(ref).add(data);
}

/**
 * Creates or overwrites a single document specified by doc which is found in a
 * collection specified by col
 * @param {String} col
 * @param {Object} data
 * @param {String} doc
 */
function setDoc(col, data, doc) {
	return firestore.collection(col).doc(doc).set(data);
}
