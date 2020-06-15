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
	}
	
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
/* ======================================= Sign In ===================================== */
describe('auth.js functions', () => {
	it('Should sign in user', (done) => {
		// Create user document test
		assert.isString('testing');
		var getUserByEmail = test.wrap(myFunctions.getUserByEmail);
		var data = {
			em: 'email@email.com',
			pa: '12345678',
		};
		getUserByEmail(data, {
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

/* ======================================= Sign Up ===================================== */
describe('signup.js functions', () => {
	it('Should create user document', (done) => {
		// Create user document test
		assert.isString('testing');
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
	it('Should add a member to an existing project', (done) => {
		var addMemberToProject = test.wrap(myFunctions.addMemberToProject);
		data = {
			mem: 'user@user.com',
			pid: 'test_project',
		};
		addMemberToProject(data, {
			auth: {
				uid: 'jckS2Q0',
			},
		})
			.then((value) => {
				//_.isObject(value).should.be.true
				expect(value.result).to.equal('Success');
				done();
			})
			.catch((error) => {
				done(error);
			});
	});
});

//test.cleanup();
/* ====================================== Sprints ===================================== */
describe('sprints.js functions', () => {
	after(() => {
		admin.app().delete();
		test.cleanup();
	});
	it('Should create new sprint', (done) => {
		// create project test	
		var createSprint = test.wrap(myFunctions.createSprint);
		data = {
			end: 'end date',
			name: 'name of sprint',
			start:	'start date'
		};
		createSprint(data, {
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
	it('Should display sprints', (done) => {
		// create project test	
		var displaySprints = test.wrap(myFunctions.displaySprints);
		data = {
			projectId: 'project id'
		};
		displaySprints(data, {
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

/* ====================================== User Stories ===================================== */
describe('userstories.js functions', () => {
	after(() => {
		admin.app().delete();
		test.cleanup();
	});
	it('Should create new user story', (done) => {
		// create project test	
		var createUserStory = test.wrap(myFunctions.createUserStory);
		data = {
			ac:	'acceptance criteria',
			de:	'description',
			po:	'points'	
		};
		createUserStory(data, {
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
	it('Should display user stories', (done) => {
		// create project test	
		var displayUserStories = test.wrap(myFunctions.displayUserStories);
		data = {
			sp:	'sprint ID',
		};
		displayUserStories(data, {
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

/* ====================================== Tasks ===================================== */
describe('tasks.js functions', () => {
	after(() => {
		admin.app().delete();
		test.cleanup();
	});
	it('Should create new task', (done) => {
		// create project test	
		var createTask = test.wrap(myFunctions.createTask);
		data = {
			userStory: 'userStory',
			projectid: 'projectid',
		};
		createTask(data, {
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
	it('Should display tasks', (done) => {
		// create project test	
		var displayTasks = test.wrap(myFunctions.displayTasks);
		data = {
			userStory: 'userStory',
			projectid: 'projectid',
		};
		displayTasks(data, {
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