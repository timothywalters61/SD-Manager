/**
 * @description This page contains all the event handlers that are related to the
 *              login section of the home page
 */

var ids = ['login-em', 'login-pa'];

ids.forEach((id, index) => {
	var domElement = document.getElementById(id);
	domElement.addEventListener('keyup', function(event) {
		// 13 is the "Enter" key on the keyboard
		if (event.keyCode == 13) {
			event.preventDefault(); // cancel the default action
			document.getElementById('signup-button-next').click(); // trigger the button element
		}
	});
});
