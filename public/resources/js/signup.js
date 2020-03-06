/**
 * @description This file contains all the functions that will be used to create a new user's account
 */

/**
 * Creates a new account
 */
function signup() {
	disableElement('signup-button');
	if (validateSignUp()) {
		var data = {
			ac: getSelectElementValue('signup-ac'),
			em: getElementValue('signup-em'),
			fn: getElementValue('signup-fn'),
			ln: getElementValue('signup-ln'),
			pa: getElementValue('signup-pa')
		};
		console.log('Creating account...');

		// create user
		auth.createUserWithEmailAndPassword(data.em, data.pa)
			.then(() => {
				// create user document
				console.log('Creating user document...');
				var createUserDoc = functions.httpsCallable(
					'createUserDocument'
				); // cloud function instance
				createUserDoc(data)
					.then(() => {
						// go to next screen
						alert('Success');
						sendToDashboard(data.ac);
					})
					.catch(onError);
			})
			.catch(onError);
	}
	enableElement('signup-button');
}

/**
 * Returns true if all the input elements in the sign up form have been filled correctly.
 * Changes the background colour of the element with an invalid value.
 */
function validateSignUp() {
	var valid = true;
	console.log('Validating...');

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

	if (!validatePass('signup-pa', 'signup-co-pa')) {
		valid = false;
		setBackgroundColour('signup-pa', '#f08080');
		setBackgroundColour('signup-co-pa', '#f08080');
	}

	console.log('Validated...');
	return valid;
}
