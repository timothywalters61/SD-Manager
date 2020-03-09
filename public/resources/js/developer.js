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
