/**
 * @author Simphiwe Zulu
 * @description This file contains all the function calls that will be uploaded to Cloud
 *              Functions.
 */

const signup = require('./signup');
const projects = require('./projects');
const admin = require('firebase-admin');

admin.initializeApp();
/* ================================ Sign Up =================================== */
exports.signup = signup.signup;
exports.createUserDocument = signup.createUserDocument;

/* =============================== Projects =================================== */
exports.addMemberToProject = projects.addNewMemberToProject;
exports.createProject = projects.createProject;
exports.getUserProjectsList = projects.getUserProjectsList;
