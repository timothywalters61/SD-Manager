/**
 * @description This file contains all the unit tests that will be used to test the
 *              Cloud Functions
 */
// At the top of test/index.test.js
const test = require('firebase-functions-test')();

// If index.js calls admin.initializeApp at the top of the file,
// we need to stub it out before requiring index.js. This is because the
// functions will be executed as a part of the require process.
// Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
adminInitStub = sinon.stub(admin, 'initializeApp');
// Now we can require index.js and save the exports inside a namespace called myFunctions.
const myFunctions = require('../index');

/* ======================================= Tests ======================================= */

var wrapped = test.wrap(myFunctions.createUserDocument)
var data = {
    dn: "Display Name",
    em: "email@email.com",
    fn: "First",
    ln: "Last"
}

wrapped(data);