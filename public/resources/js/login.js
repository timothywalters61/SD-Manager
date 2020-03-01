/**
 * @description This file contains all the functions that will be used in the login
 *              section of the platform.
 */

/**
 * Returns true if the login form has been filled in correctly. Changes colour of the
 * input element if value is invalid.
 */
function validateLogin() {
	var valid = true;

	if (!validateEmail('login-em')) {
		valid = false;
		setBackgroundColour('login-em', '#f08080');
	}

	if (!validateString(getElementValue('login-pa'))) {
		valid = false;
		setBackgroundColour('login-pa', '#f08080');
	}

	return valid;
}
