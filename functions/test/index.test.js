/**
 * @description This file contains all the unit tests that will be used to test the
 *              Cloud Functions
 */
/* ====================================== Imports ====================================== */
// At the top of test/index.test.js
const test = require('firebase-functions-test')(
	{
		databaseURL: 'https://sd-manager.firebaseio.com',
		projectId: 'sd-manager',
		storageBucket: 'sd-manager.appspot.com',
	},
	'../sd-manager-firebase-adminsdk-mx72v-e8dac43245.json'
);
const sinon = require('sinon');
const admin = require('firebase-admin');
const assert = require('assert');
const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);
const expect = chai.expect;
const should = chai.should();
const _ = require('lodash');
// If index.js calls admin.initializeApp at the top of the file,
// we need to stub it out before requiring index.js. This is because the
// functions will be executed as a part of the require process.
// Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
//adminInitStub = sinon.stub(admin, 'initializeApp');
// Now we can require index.js and save the exports inside a namespace called myFunctions.
const myFunctions = require('../index');

/* ======================================= Tests ======================================= */
var success = {
	result: 'Success',
};
/* ======================================= Sign Up ===================================== */
describe('signup.js functions', () => {
	it('Should create user document', (done) => {
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
		})
			.then((value) => {
				//expect(value).to.equal(success);
				_.isObject(value).should.be.true;
				done();
			})
			.catch((error) => {
				done(error);
			});
	});
});

/* ====================================== Projects ===================================== */
describe('projects.js functions', () => {
	after(() => {
		admin.app().delete();
		test.cleanup();
	});
	it('Should create new project', (done) => {
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
		})
			.then((value) => {
				_.isObject(value).should.be.true;
				done();
			})
			.catch((error) => {
				done(error);
			});
	});

	it('Should retrieve list of projects', (done) => {
		var getUserProjectsList = test.wrap(myFunctions.getUserProjectsList);
		data = {};
		getUserProjectsList(data, {
			auth: {
				uid: 'jckS2Q0',
			},
		})
			.then((value) => {
				_.isObject(value).should.be.true;
				done();
			})
			.catch((error) => {
				done(error);
			});
	});
});

//test.cleanup();
