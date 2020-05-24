const addForm = document.querySelector('#add-form');

addForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const dev = addForm['add-email'].value;
	var user = auth.currentUser;

	getDoc('projects', projectID).then((doc) => {
		if (doc.exists) {
			if (doc.data().team.includes(dev)) {
				console.log('in the team');
				alert('Developer is already in the team');
			} else {
				var cond = {
					fieldPath: 'email',
					opStr: '==',
					value: dev,
				};
				collectionWhere('users', cond)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							if (doc.exists) {
								data = {
									from_id: user.uid,
									to_id: doc.id,
									from_email: user.email,
									project_id: projectID,
								};
								addDoc('invites', data).then(() => {
									alert('invite sent');
									addForm.reset();
								});
							} else {
								alert('user does not exist');
							}
						});
					})
					.catch((error) => {
						alert('error getting documents, ', error);
					});
			}
		} else {
			console.log('project does not exist');
		}
	});
});
