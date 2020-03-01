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
	var ids = [
		'signup-ac',
		'signup-em',
		'signup-fn',
		'signup-ln',
		'signup-un',
		'signup-un-id',
		'signup-pa',
		'signup-co-pa'
	]; // array of all the element ids that are in the signup form

	// iterates through the array checking if all element values are valid
	ids.forEach((id, index) => {
		if (index == 0) {
			// validate type of account
			if (!validateAccType(id)) {
				valid = false;
				setBackgroundColour(id, '#f08080');
				continue;
			}
		} else if (index == 1) {
			// validate email address
			if (!validateEmail(id)) {
				valid = false;
				setBackgroundColour(id, '#f08080');
			}
		} else if (index == 7) {
			// validate passwords
			if (!validatePass(ids[index - 1], id)) {
				valid = false;
				setBackgroundColour(id, '#f08080');
				setBackgroundColour(id, '#f08080');
			}
		} else {
			// check if element has a value
			var val = getElementValue(id);
			if (!validateString(val)) {
				valid = false;
				setBackgroundColour(id, '#f08080');
			}
		}
	});

	return valid;
}
