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
