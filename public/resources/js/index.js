/**
 * @description This file contains all the functions that will be used to navigate the home
 *              page.
 */

/**
 * Shows the sign up block and hides the rest
 */
function showSignUp() {
	hideElement('home');
	hideElement('login');
	showBlockElement('signup-form');
	showBlockElement('signup');
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
