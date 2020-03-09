/**
 * @description This file contains all the functions that will be used to navigate the home
 *              page.
 */

showHome();

/**
 * Shows the home block and hides the rest
 */
function showHome() {
	hideElement('login');
	hideElement('signup');
	showBlockElement('home');
}

/**
 * Shows the login block and hides the rest
 */
function showLogin() {
	hideElement('home');
	hideElement('signup');
	showBlockElement('login-form');
	showBlockElement('login');
}

/**
 * Shows the sign up block and hides the rest
 */
function showSignUp() {
	hideElement('home');
	hideElement('login');
	showBlockElement('signup-form');
	showBlockElement('signup');
}
