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
 * Returns a document snapshot of a document specified by doc in a collection specified
 * by col.
 * @param {String} col Collection reference
 * @param {String} doc Document reference
 */
function getDoc(col, doc) {
	return firestore.collection(col).doc(doc).get();
}

/**
 * Get a DocumentReference for the document within the collection at the specified path
 * @param {String} col
 * @param {String} doc
 */
function getDocumentReference(col, doc) {
	return firebase.collection(col).doc(doc);
}

/**
 * Creates and returns a new Query with the additional filter that documents must contain
 * the specified field and the value should satisfy the relation constraint provided.
 * @param {String} col Collection reference
 * @param {Object} condition Object with fieldPath, opStr and value
 */
function collectionWhere(col, condition) {
	return firestore
		.collection(col)
		.where(condition.fieldPath, condition.opStr, condition.value);
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
