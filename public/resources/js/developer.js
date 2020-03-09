/**
 * @description This file contains all the functiosn that will be used in the developer.html
 *              page to make it more responsive
 */

showMain();

/**
 * Shows the main section of the page and hides the rest
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
	removeElementClass('nav-item-scrum', 'current');
	addElementClass('logo', 'current');
}

/**
 * Shows the nofitications section of the web page and hides the rest
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
	removeElementClass('nav-item-scrum', 'current');
	removeElementClass('nav-item-profile', 'current');
	addElementClass('nav-item-notifications', 'current');
}

/**
 * Shows the Messages section of the page and hides the rest
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
	removeElementClass('nav-item-scrum', 'current');
	addElementClass('nav-item-messages', 'current');
}

/**
 * Shows the Scrum section of the page and hides the rest
 */
function showScrum() {
	hideElement('developer-notifications');
	hideElement('developer-messages');
	hideElement('developer-main');
	hideElement('developer-projects');
	hideElement('developer-profile');
	showBlockElement('developer-scrum');
	removeElementClass('nav-item-projects', 'current');
	removeElementClass('nav-item-messages', 'current');
	removeElementClass('nav-item-notifications', 'current');
	removeElementClass('nav-item-git', 'current');
	removeElementClass('nav-item-profile', 'current');
	removeElementClass('logo', 'current');
	addElementClass('nav-item-scrum', 'current');
}

/**
 * Shows the Projects sections of the page and hides the rest
 */
function showProjects() {
	hideElement('developer-notifications');
	hideElement('developer-messages');
	hideElement('developer-main');
	hideElement('developer-scrum');
	hideElement('developer-profile');
	showBlockElement('developer-projects');
	removeElementClass('nav-item-scrum', 'current');
	removeElementClass('nav-item-messages', 'current');
	removeElementClass('nav-item-notifications', 'current');
	removeElementClass('nav-item-git', 'current');
	removeElementClass('nav-item-profile', 'current');
	removeElementClass('logo', 'current');
	addElementClass('nav-item-projects', 'current');
}

/**
 * Shows the Profile section of the page and hides the rest
 */
function showProfile() {
	hideElement('developer-notifications');
	hideElement('developer-messages');
	hideElement('developer-main');
	hideElement('developer-projects');
	hideElement('developer-scrum');
	showBlockElement('developer-profile');
	removeElementClass('nav-item-projects', 'current');
	removeElementClass('nav-item-messages', 'current');
	removeElementClass('nav-item-notifications', 'current');
	removeElementClass('nav-item-git', 'current');
	removeElementClass('nav-item-scrum', 'current');
	removeElementClass('logo', 'current');
	addElementClass('nav-item-profile', 'current');
}
