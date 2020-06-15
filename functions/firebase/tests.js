var email;
var password;

function signInTest(email, password) {
    return email+password;
}

function createUser(email, password) {
    return 0;
}
function createProject(email, password) {
    return 0;
}
function getProjects(email, password) {
    return 0;
}
function addMemberToProject(email, password) {
    return 0;
}
function addSprint(email, password) {
    return 0;
}
function getSprints(email, password) {
    return 0;
}
function createUserStory(email, password) {
    return 0;
}
function getUserStories(email, password) {
    return 0;
}
function createTask(email, password) {
    return 0;
}
function getTasks(email, password) {
    return 0;
}
// console.log(signUpTest('tim007jb@icloud.com','12345678'));
// console.log(signInTest('tim007jb@icloud.com','12345678'));
//testing varia
getSignIn=(email,password)=>signInTest(email,password);
createUser1=(email,password)=>createUser(email,password);
createProject1=(email,password)=>createProject(email,password);
getProjects1=(email,password)=>getProjects(email,password);
addMemberToProject1=(email,password)=>addMemberToProject(email,password);
addSprint1=(email,password)=>addSprint(email,password);
getSprints1=(email,password)=>getSprints(email,password);
createUserStory1=(email,password)=>createUserStory(email,password);
getUserStories1=(email,password)=>getUserStories(email,password);
createTask1=(email,password)=>createTask(email,password);
getTasks1=(email,password)=>getTasks(email,password);
//getSignUp=(email,passwprd)=>signUpTest(email,password);
//getFirebaseConnection=()=>signUpTest(email,password);
module.exports = {getSignIn,createUser1,createProject1,getProjects1,addMemberToProject1, addSprint1,getSprints1 ,createUserStory1, getUserStories1,createTask1, getTasks1};