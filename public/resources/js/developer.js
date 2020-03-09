/**
 * @description This file contains all the functiosn that will be used in the developer.html
 *              page to make it more responsive
 */
/**
 * Shows the main section of the page
 */
function showMain() {
	hideElement('developer-notifications');
	hideElement('developer-messages');
	hideElement('developer-scrum');
	hideElement('developer-projects');
	hideElement('developer-profile');
	showBlockElement('developer-main');
	removeElementClass('nav-item-projects', 'current');
	removeElementClass('nav-item-messages', 'current');
	removeElementClass('nav-item-notifications', 'current');
	removeElementClass('nav-item-git', 'current');
	removeElementClass('nav-item-profile', 'current');
	addElementClass('logo', 'current');
}

/**
 * Shows the nofitications section of the web page
 */
function showNotifications() {
	hideElement('developer-main');
	hideElement('developer-messages');
	hideElement('developer-scrum');
	hideElement('developer-projects');
	hideElement('developer-profile');
	showBlockElement('developer-notifcations');
	removeElementClass('nav-item-projects', 'current');
	removeElementClass('nav-item-messages', 'current');
	removeElementClass('logo', 'current');
	removeElementClass('nav-item-git', 'current');
	removeElementClass('nav-item-profile', 'current');
	addElementClass('nav-item-notifications', 'current');
}

/**
 * Shows the Messages section of the page
 */
function showMessages() {
	hideElement('developer-notifications');
	hideElement('developer-main');
	hideElement('developer-scrum');
	hideElement('developer-projects');
	hideElement('developer-profile');
	showBlockElement('developer-messages');
	removeElementClass('nav-item-projects', 'current');
	removeElementClass('logo', 'current');
	removeElementClass('nav-item-notifications', 'current');
	removeElementClass('nav-item-git', 'current');
	removeElementClass('nav-item-profile', 'current');
	addElementClass('nav-item-messages', 'current');
}
