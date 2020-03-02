/**
 * @description This file contains all the functions that will be used to create a new user's account
 */

/**
 * Creates a new account
 */
function signup() {
	if (validateSignUp()) {
		var data = {
			ac: getSelectElementValue('signup-ac'),
			em: getElementValue('signup-em'),
			fn: getElementValue('signup-fn'),
			ln: getElementValue('signup-ln'),
			un: getElementValue('signup-un'),
			un_id: getElementValue('signup-un-id'),
			pa: getElementValue('signup-pa')
		};

		var createUser = functions.httpsCallable('signup');
		createUser(data)
			.then(value => {
				alert('Account successfully created.');
				sendToDashboard(data.ac);
			})
			.catch(onError());
	}
}

/**
 * Returns true if all the input elements in the sign up form have been filled correctly.
 * Changes the background colour of the element with an invalid value.
 */
function validateSignUp() {
	var valid = true;

	if (!validateAccType('signup-ac')) {
		valid = false;
		setBackgroundColour('signup-ac', '#f08080');
	}
	if (!validateString(getElementValue('signup-fn'))) {
		valid = false;
		setBackgroundColour('signup-fn', '#f08080');
	}
	if (!validateString(getElementValue('signup-ln'))) {
		valid = false;
		setBackgroundColour('signup-ln', '#f08080');
	}
	if (!validateEmail('signup-em')) {
		valid = false;
		setBackgroundColour('signup-em', '#f08080');
	}
	if (!validateString(getElementValue('signup-un'))) {
		valid = false;
		setBackgroundColour('signup-un', '#f08080');
	}
	if (!validateString(getElementValue('signup-un-id'))) {
		valid = false;
		setBackgroundColour('signup-un-id', '#f08080');
	}
	if (validatePass('signup-pa', 'signup-co-pa')) {
		valid = false;
		setBackgroundColour('signup-pa', '#f08080');
		setBackgroundColour('signup-co-pa', '#f08080');
	}
	return valid;
}
