/**
 * @description This file controls the user's session as well as which pages the user
 *              has access to based on their access level.
 */

/**
 * Signs the user out of their account and takes them to the home page
 */
function logout() {
	auth.signOut()
		.then(() => {
			location.pathname = 'index.html';
		})
		.catch(onError);
}

/**
 * This function will be called every time a page is loaded to check whether there's
 * a user logged in or not. If a user is logged in, then check if they are in the
 * correct section of the web app. I
 */
function userCheck() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var claim = getCustomUserClaim(user);
			var path = getPathname();

			if (path != 'index.html' && !path.includes(claim)) {
				sendToDashboard(claim);
			}
		} else {
			// No user is signed in.
			var path = getPathname(); // the name of the current page
			// check if the current page isn't the home page or sign up page
			if (path != 'index.html') {
				// user is not is the correct section
				setPathname('index.html');
			} else {
				showHome();
			}
		}
	});
}
/**
 * Sends user to their dashboard according to their access level
 * @param {string} ac
 */
function sendToDashboard(ac) {
	setPathname(ac + '.html');
}
