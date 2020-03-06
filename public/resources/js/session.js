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
		console.log(user);
		if (user) {
			// User is signed in.
			user.getIdTokenResult().then(idTokenResult => {
				var claim = idTokenResult.claims;
				var pathname = getPathname();
				if (!pathname.includes('client') && claim.client) {
					sendToDashboard('client');
					return;
				} else if (!pathname.includes('developer') && claim.developer) {
					sendToDashboard('developer');
					return;
				}
			});
		} else {
			// No user is signed in.
			var pathname = getPathname();
			if (pathname != '/' || !pathname.includes('index.html')) {
				setPathname('index.html');
				return;
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
