/**
 * @description This file contains all functions that will be used to simplify
 *              the code.
 */

/**
 * Adds class cl to the class list of the element specified by id
 * @param {string} id
 * @param {string} cl
 */
function addClass(id, cl) {
	document.getElementById(id).classList.add(cl);
}

/**
 * Enables the onclick function of an element
 * @param {string} id
 */
function enableElement(id) {
	document.getElementById(id).disabled = false;
}

/**
 * Disables the onclick function of an element
 * @param {string} id
 */
function disableElement(id) {
	document.getElementById(id).disabled = true;
}

/* =============================== Getters ================================ */
/**
 * Returns a String with the user's custom claim
 * @param {admin.auth.UserRecord} user
 */
function getCustomUserClaim(user) {
	var customClaims = user.customClaims;

	if (customClaims.client) {
		return 'client';
	} else if (customClaims.developer) {
		return 'developer';
	} else {
		return '';
	}
}

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

/* ============================ Event Handlers ============================ */
/**
 * Displays an alert with error details from an error object
 * @param {object} error
 */
function onError(error) {
	console.error(error);
	alert('Error!\n' + 'Code: ' + error.code + '\nMessage: ' + error.message);
}
/* =============================== Hiders ================================ */
/**
 * Hides DOM Element
 * @param {String} id
 */
function hideElement(id) {
	document.getElementById(id).style.display = 'none';
}

/* =============================== Setters ================================ */
/**
 * Sets the background colour of the DOM element specified to the colour specified
 * @param {String} id
 * @param {String} colour
 */
function setBackgroundColour(id, colour) {
	document.getElementById(id).style.background = colour;
}

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
/* =============================== Showwers ================================ */

/**
 * Sets the display value of a DOM element to 'block'
 * @param {String} id
 */
function showBlockElement(id) {
	document.getElementById(id).style.display = 'block';
}

/**
 * Sets the display value of a DOM Element to 'inline-block'
 * @param {String} id
 */
function showInlineBlockElement(id) {
	document.getElementById(id).style.display = 'inline-block';
}

/**
 * Sets the display value of a EOM Element to 'inline'
 * @param {String} id
 */
function showInlineElement(id) {
	document.getElementById(id).style.display = 'inline';
}
/* ================================ Validators ============================= */

/**
 * Returns true if the value selected in the element is in the list of options
 * @param {string} id
 */
function validateAccType(id) {
	var val = getSelectElementValue(id);
	return val == 'client' || val == 'developer';
}

/**
 * Returns true if email address in the input element is valid
 * @param {string} id
 */
function validateEmail(id) {
	var val = getElementValue(id);
	var atindex = val.indexOf('@');
	var dotindex = val.lastIndexOf('.');

	return (
		!val == '' && validateString(val) && atindex > 0 && dotindex > atindex
	);
}

/**
 * Returns true if both elements are valid and have the same value
 * @param {string} pass
 * @param {string} repass
 */
function validatePass(pass, repass) {
	pval = getElementValue(pass);
	rval = getElementValue(repass);

	return validateString(rval) && validateString(pval) && pval == rval;
}

/**
 * Returns true if 'str' is valid
 * @param {String} str
 */
function validateString(str) {
	return str.length > 0;
}
