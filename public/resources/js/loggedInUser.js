var user = auth.currentUser;

auth.onAuthStateChanged(user => {
	if (user) {
		console.log('user logged in: ', user);
		var data = [user.displayName, user.email];
		//console.log(data);
		setUpSideNav(data);
	} else {
		console.log('user logged out');
		window.location.href = 'index.html';
	}
});

//logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
	e.preventDefault();

	auth.signOut()
		.then(() => {
			//console.log("user has signed out");
		})
		.catch(function(error) {
			console.log('user failed to sign out because of error: ', error);
			alert(error.message);
		});
});
