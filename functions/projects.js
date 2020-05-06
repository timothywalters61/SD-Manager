/**
 * @description This file contains all the functions that use the 'projects' document in
 *              the database.
 */

const admin = require('firebase-admin');
const auth = require('./auth');
const docs = require('./docs');
const errors = require('./errors');
const functions = require('firebase-functions');

/* =========================================== Exports ============================================= */

exports.acceptInvite = functions.https.onCall((data, context) => {
	var projectid = data.pid;
	var uid = context.auth.uid;
});

/**
 * Adds a new member to an existing project
 */
exports.addNewMemberToProject = functions.https.onCall((data, context) => {
	var projectid = data.pid;
	var memberEmail = data.mem;
	var memberID = '';
	var memberName = '';

	return auth
		.getUserByEmail(memberEmail)
		.then((user) => {
			memberID = user.uid;
			memberName = user.displayName;
			return addMemberToProject(
				user.displayName,
				user.email,
				projectid,
				'developer',
				user.uid
			);
		})
		.then((value) => {
			return getProjectDocument(projectid);
		})
		.then((snapshot) => {
			var data = snapshot.data();
			return addProjectToUserDocument(
				projectid,
				data.name,
				data.description,
				'developer',
				memberID
			);
		})
		.then((value) => {
			return {
				result: 'Success',
			};
		});
});

/**
 * Creates a project document in the projects collection and the user's subcollection.
 */
exports.createProject = functions.https.onCall((data, context) => {
	var projectName = data.pn;
	var description = data.de;
	var uid = context.auth.uid;

	var projectData = {
		name: projectName,
		description: description,
	};
	var projectid = '';

	return createProjectDocument(projectData)
		.then((value) => {
			projectid = value.id;
			console.log('Adding project to user document');
			return addProjectToUserDocument(
				projectid,
				projectName,
				description,
				'product_owner',
				uid
			);
		})
		.then((value) => {
			return admin.auth().getUser(uid);
		})
		.then((user) => {
			console.log('Adding first member member to project');
			return addMemberToProject(
				user.displayName,
				user.email,
				projectid,
				'product_owner',
				uid
			);
		})
		.then((value) => {
			return {
				result: 'Success',
			};
		})
		.catch(errors.onError);
});

exports.getUserProjectsList = functions.https.onCall((data, context) => {
	var uid = context.auth.uid;

	return getUserProjects(uid)
		.then((querySnapshot) => {
			result = [];
			querySnapshot.forEach((doc) => {
				var data = doc.data();
				entry = {
					id: doc.id,
					name: data.name,
				};
				result.push(entry);
			});
			return result;
		})
		.catch(errors.onError);
});

/* ========================================= Local Functions ======================================= */

/**
 * Creates a member document corresponding to uid in the members subcollection
 * of a project corresponding to projectid
 * @param {String} projectid
 * @param {String} uid
 * @param {Object} data
 */
function addMemberDataToProject(projectid, uid, data) {
	return docs.createDoc('projects/' + projectid + '/members/' + uid, data);
}

/**
 * Creates a member document in the members subcollection of a project
 * @param {string} displayName
 * @param {string} email
 * @param {string} projectid
 * @param {string} role
 * @param {string} uid
 */
function addMemberToProject(displayName, email, projectid, role, uid) {
	var data = createProjectMemberObject(displayName, email, role);

	return docs.createDoc('projects/' + projectid + '/members/' + uid, data);
}

/**
 * Creates a member document in the invites subcollection of a project
 * @param {string} displayName
 * @param {string} email
 * @param {string} projectid
 * @param {string} role
 * @param {string} uid
 */
function addMemberToInvites(displayName, email, projectid, role, uid) {
	var data = createProjectMemberObject(displayName, email, role);

	return docs.createDoc('projects/' + projectid + '/invites/' + uid, data);
}

/**
 * Creates a project document in a user's invites subcollection
 * @param {string} projectid
 * @param {string} projectName
 * @param {string} projectDescription
 * @param {string} projectRole
 * @param {string} uid
 */
function addProjectInviteToUserDocument(
	projectid,
	projectName,
	projectDescription,
	projectRole,
	uid
) {
	var data = {
		name: projectName,
		description: projectDescription,
		role: projectRole,
	};

	return docs
		.createDoc('users/' + uid + '/invites/' + projectid, data)
		.then((value) => {
			return {
				isEqual: value.isEqual,
				writeTime: value.writeTime,
				id: projectid,
			};
		});
}

/**
 * Creeates a project document in a user's projects subcollection
 * @param {Object} data
 * @param {String} projectid
 * @param {String} uid
 */
function addProjectDataToUserDocument(data, projectid, uid) {
	return docs.createDoc('users/' + uid + '/projetcs/' + projectid, data);
}

/**
 * Creates a project document in a user's projects subcollection
 * @param {string} projectid
 * @param {string} projectName
 * @param {string} projectDescription
 * @param {string} projectRole
 * @param {string} uid
 */
function addProjectToUserDocument(
	projectid,
	projectName,
	projectDescription,
	projectRole,
	uid
) {
	var data = {
		name: projectName,
		description: projectDescription,
		role: projectRole,
	};

	return docs
		.createDoc('users/' + uid + '/projects/' + projectid, data)
		.then((value) => {
			return {
				isEqual: value.isEqual,
				writeTime: value.writeTime,
				id: projectid,
			};
		});
}

/**
 * Creates a document in the Projects collection with data as its content
 * @param {object} data
 */
function createProjectDocument(data) {
	return docs.addDoc('projects', data);
}

/**
 * Creates the data object that will be used as a project member object
 * @param {string} displayName
 * @param {string} email
 * @param {string} role
 */
function createProjectMemberObject(displayName, email, role) {
	return {
		display_name: displayName,
		email: email,
		role: role,
	};
}

/**
 * Deletes an invite document that's found in a project specified by
 * projectid that was sent to the user corresponding to uid
 * @param {String} projectid
 * @param {String} uid
 */
function deleteInviteFromProjectDocument(projectid, uid) {
	return docs.deleteDoc('projects/' + projectid + '/invites/' + uid);
}

/**
 * Deletes an invite document corresponding to projectid that's found
 * in a user's invites collection that corresponds to uid
 * @param {String} projectid
 * @param {String} uid
 */
function deleteInviteFromUserDocument(projectid, uid) {
	return docs.deleteDoc('users/' + uid + '/invites/' + projectid);
}

/**
 * Returns a document snapshot of a project corresponding to projectid
 * @param {String} projectid
 */
function getProjectDocument(projectid) {
	return docs.getDoc('projects/' + projectid);
}

/**
 * Returns a collection snapshot of a user's projects
 * @param {string} uid
 */
function getUserProjects(uid) {
	return docs.getCollection('users/' + uid + '/projects');
}
