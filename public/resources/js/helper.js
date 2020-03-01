/**
 * @description This file contains all functions that will be used to simplify
 *              the code.
 */

/* =============================== Getters ================================ */
/**
 * Returns the value of the element specified by id
 * @param {String} id
 */
function getElementValue(id) {
	return document.getElementById(id).value;
}

/**
 * Returns the selected option's value of a select element specified by id
 * @param {string} id
 */
function getSelectElementValue(id) {
	var el = document.getElementById(id);
	return el.options[el.selectedIndex].value;
}

/**
 * Returns the current URL pathname
 */
function getPathname() {
	return location.pathname;
}

/* =============================== Setters ================================ */

/**
 * Sets the value of the element specified by id to val
 * @param {String} id
 * @param {String} val
 */
function setElementValue(id, val) {
	document.getElementById(id).value = val;
}

/**
 * Sets the current URL pathname to 'pathname'
 * @param {String} pathname
 */
function setPathname(pathname) {
	location.pathname = pathname;
}
