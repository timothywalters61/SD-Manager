/**
 * @description This file contains event handlers that are related to the sign up
 *              form of the home page.
 */

var ids = [
	'signup-em',
	'signup-fn',
	'signup-ln',
	'signup-un',
	'signup-un-id',
	'signup-pa',
	'signup-co-pa'
];
ids.forEach((id, index) => {
	var domElement = document.getElementById(id);
	domElement.addEventListener('keyup', function(event) {
		// 13 is the "Enter" key on the keyboard
		if (event.keyCode == 13) {
			event.preventDefault(); // cancel the default action
			document.getElementById('signup-button').click(); // trigger the button element
		}
	});
});
