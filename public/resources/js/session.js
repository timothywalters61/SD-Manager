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
	var onAuthStateChanged = firebase.auth().onAuthStateChanged(function(user) {
		console.log(user);
		if (user) {
			// User is signed in.
			user.getIdTokenResult().then(idTokenResult => {
				var claim = idTokenResult.claims;
				var pathname = getPathname();
				console.log(pathname);
				console.log(claim);
				if (!pathname.includes('client') && claim.client) {
					sendToDashboard('client');
					return;
				} else if (!pathname.includes('developer') && claim.developer) {
					sendToDashboard('developer');
				} else if (
					!pathname.includes('product_owner') &&
					claim.product_owner
				) {
					sendToDashboard('product_owner');
				}
			});
		} else {
			// No user is signed in.
			var pathname = getPathname();
			if (
				pathname.includes('client') ||
				pathname.includes('developer') ||
				pathname.includes('product_owner')
			) {
				setPathname('index.html');
				return;
			}
			/*
			if (pathname != '') {
				setPathname('index.html');
			}*/
		}
	});
	//onAuthStateChanged();
}
/**
 * Sends user to their dashboard according to their access level
 * @param {string} ac
 */
function sendToDashboard(ac) {
	setPathname(ac + '.html');
}
