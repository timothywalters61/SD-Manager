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
	addElementClass('nav-item-home', 'current');
	removeElementClass('nav-item-about', 'current');
	removeElementClass('nav-item-contact', 'current');
	removeElementClass('nav-item-login', 'current');
	removeElementClass('nav-item-signup', 'current');
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
