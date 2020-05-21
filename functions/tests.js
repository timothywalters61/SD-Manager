var email;
var password;

function signInTest(email, password) {
    return email+password;
}

function signUpTest(email, password) {
    return email+password;
}
console.log(signUpTest('tim007jb@icloud.com','12345678'));
console.log(signInTest('tim007jb@icloud.com','12345678'));
//testing varia
getSignIn=(email,password)=>signInTest(email,password);
getSignUp=(email,passwprd)=>signUpTest(email,password);
//getFirebaseConnection=()=>signUpTest(email,password);
module.exports = {getSignIn,getSignUp};