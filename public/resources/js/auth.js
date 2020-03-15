var user = auth.currentUser;

//if user is logged in pushes to userHome page
auth.onAuthStateChanged(user => {
	if (user) {
		console.log('user logged in: ', user);
		if (user.displayName != null) {
			window.location.href = 'userHome.html';
		}
	} else {
		console.log('user logged out');
	}
});

//signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
	e.preventDefault();

	const signUpEmail = signupForm['signup-email'].value;
	const signUpDisplayName = signupForm['signup-displayname'].value;
	const signUpFirstName = signupForm['signup-firstname'].value;
	const signUpLastName = signupForm['signup-lastname'].value;
	const signUpPassword = signupForm['signup-password'].value;
	const signUpConfirmpassword = signupForm['signup-confirmpassword'].value;

	if (
		signUpPassword === signUpConfirmpassword &&
		signUpPassword.length >= 6
	) {
		auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
			.then(cred => {
				console.log(cred.user); //creates user with email and password
				cred.user
					.updateProfile({
						displayName: signUpDisplayName
					})
					.then(() => {
						var data = {
							em: signUpEmail,
							dn: signUpDisplayName,
							fn: signUpFirstName,
							ln: signUpLastName
						};

						var createUserDoc = functions.httpsCallable(
							'createUserDocument'
						);
						return createUserDoc(data);
					})
					.then(function() {
						console.log('username saved as: ', signUpDisplayName);
						const modal = document.querySelector('#modal-signup');
						M.Modal.getInstance(modal).close();
						signupForm.reset();
						alert('user created');
						window.location.href = 'userHome.html';
					})
					.catch(function(error) {
						console.log('error saving username: ', error);
						alert(error.message);
					});
			})
			.catch(function(error) {
				console.log(
					'failed to authenticate user because of error: ',
					error
				);
				alert(error.message);
			});
	} else {
		console.log('passwords must match and be 6 or more characters long!!!');
		alert('passwords must match and be 6 or more characters long!!!');
	}
});

//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
	e.preventDefault();

	const loginEmail = loginForm['login-email'].value;
	const loginPassword = loginForm['login-password'].value;

	auth.signInWithEmailAndPassword(loginEmail, loginPassword)
		.then(cred => {
			const modal = document.querySelector('#modal-login');
			M.Modal.getInstance(modal).close();
			loginForm.reset();
			//M.toast({html: 'login successfull'})
			window.location.href = 'userHome.html';
			//console.log(cred.user);
		})
		.catch(function(error) {
			console.log('user failed to sign in because of error: ', error);
			alert(error.message);
		});
});
