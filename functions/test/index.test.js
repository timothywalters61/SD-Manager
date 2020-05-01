/**
 * @description This file contains all the unit tests that will be used to test the
 *              Cloud Functions
 */

// At the top of test/index.test.js
const test = require('firebase-functions-test')();
const sinon = require('sinon');
const admin = require('firebase-admin');
// If index.js calls admin.initializeApp at the top of the file,
// we need to stub it out before requiring index.js. This is because the
// functions will be executed as a part of the require process.
// Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
//adminInitStub = sinon.stub(admin, 'initializeApp');
// Now we can require index.js and save the exports inside a namespace called myFunctions.
const myFunctions = require('../index');

/* ======================================= Tests ======================================= */
/* ======================================= Sign Up ===================================== */
// Create user document test
var createUserDocument = test.wrap(myFunctions.createUserDocument);
var data = {
	dn: 'Display Name',
	em: 'email@email.com',
	fn: 'First',
	ln: 'Last',
};
createUserDocument(data, {
	auth: {
		uid: 'jckS2Q0',
	},
});

/* ====================================== Projects ===================================== */
// create project test
var createProject = test.wrap(myFunctions.createProject);
data = {
	pn: 'Project',
	de: 'Description of project',
};
createProject(data, {
	auth: {
		uid: 'jckS2Q0',
	},
});

var getUserProjectsList = test.wrap(myFunctions.getUserProjectsList);
data = {};
getUserProjectsList(data, {
	auth: {
		uid: 'jckS2Q0',
	},
});
test.cleanup();
