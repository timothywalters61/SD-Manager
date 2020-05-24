const projectID = localStorage.getItem('docID');
const ownerID = localStorage.getItem('ownerID');

auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('user logged in: ', user);
		//console.log(data);

		//only team members can open this page

		getDoc('projects', projectID).then((doc) => {
			if (doc.exists) {
				if (doc.data().team.includes(user.email)) {
					console.log('in the team');
					if (user.uid === ownerID) {
						window.location.href = 'projectOwner.html';
					}
				} else {
					window.location.href = 'userHome.html';
				}
			} else {
				console.log('project does not exist');
			}
		});

		//set up sidenav

		var data = [user.displayName, user.email];
		setUpSideNav(data);

		//populate team dropdown

		getDocumentReference('projects', projectID).onSnapshot(function (doc) {
			if (doc.exists) {
				console.log(doc.data().team);
				setUpTeam(doc.data().team);
			} else {
				console.log('project does not exist');
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
