const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('user logged in: ', user);
		//create user doc in database

		getDoc('users', user.uid).then((doc) => {
			if (doc.exists) {
				console.log('user document exists');
			} else {
				var data = {
					email: user.email,
					display_name: user.displayName,
				};
				setDoc('users', data, user.uid)
					.then(() => {
						console.log('user document created');
					})
					.catch(function (error) {
						alert(
							'user document failed to create because of error: ',
							error
						);
					});
			}
		});

		//set up sidenav

		var data = [user.displayName, user.email];
		setUpSideNav(data);

		//set up project dropdown
		var cond = {
			fieldPath: 'team',
			opStr: 'array-contains',
			value: user.email,
		};
		collectionWhere('projects', cond).onSnapshot(function (snapshot) {
			if (snapshot.docs != 0) {
				console.log(snapshot.docs);
				setUpProjects(snapshot.docs);
			} else {
				console.log('projects do not exist');
				let html =
					'<li><a href="#">You Currently Have No Projects</a></li>';
				projectList.innerHTML = html;
			}
		});

		//set up invite dropdown
		var cond = {
			fieldPath: 'inviteToID',
			opStr: '==',
			value: user.uid,
		};
		collectionWhere('invites', cond).onSnapshot(function (snapshot) {
			if (snapshot.docs != 0) {
				setUpInvites(snapshot.docs);
			} else {
				console.log('invites do not exist');
				let html = '<li><a href="#">No Invites</a></li>';
				inviteList.innerHTML = html;
				let html2 = 'Invites<span class="badge">0</span>';
				inviteBadge.innerHTML = html2;
			}
		});
	} else {
		console.log('user logged out');
		window.location.href = 'index.html';
	}
});

//logout

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
	e.preventDefault();

	auth.signOut()
		.then(() => {
			//console.log("user has signed out");
		})
		.catch(function (error) {
			console.log('user failed to sign out because of error: ', error);
			alert(error.message);
		});
});
