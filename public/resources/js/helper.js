/**
 * @description This file contains all functions that will be used to simplify
 *              the code.
 */

/* ================================ Adders ================================ */
/**
 * Adds class cl to the class list of the element specified by id
 * @param {String} id
 * @param {String} cl
 */
function addElementClass(id, cl) {
	document.getElementById(id).classList.add(cl);
}

/* =============================== Enablers ================================ */
/**
 * Enables the onclick function of an element
 * @param {String} id
 */
function enableElement(id) {
	document.getElementById(id).disabled = false;
}

/* ================================ Diasblers ================================ */
/**
 * Disables the onclick function of an element
 * @param {String} id
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
 * @param {String} id
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
 * @param {Object} error
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

/* =============================== Removers =============================== */
/**
 * Removes class cl from the class list of the element specified by id
 * @param {String} id
 * @param {String} cl
 */
function removeElementClass(id, cl) {
	document.getElementById(id).classList.remove(cl);
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

/* ============================== Toggle Functions ========================= */
/**
 * Returns true if class cl is on for the element specified by id, otherwise
 * it returns false
 * @param {String} id
 * @param {String} cl
 */
function toggleElementClass(id, cl) {
	return document.getElementById(id).classList.toggle(cl);
}
/* ================================ Validators ============================= */

/**
 * Returns true if the value selected in the element is in the list of options
 * @param {String} id
 */
function validateAccType(id) {
	var val = getSelectElementValue(id);
	return val == 'client' || val == 'developer' || val == 'product_owner';
}

/**
 * Returns true if email address in the input element is valid
 * @param {String} id
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
 * @param {String} pass
 * @param {String} repass
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
