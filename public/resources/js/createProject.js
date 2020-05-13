//save project to database

const create = document.querySelector('#create-form');
create.addEventListener('submit', (e) => {
	e.preventDefault();

	const projectName = create['projectName'].value;
	const projectDescription = create['projectDescription'].value;
	var user = auth.currentUser;

	console.log(projectName, ' ', projectDescription);
	if (user) {
		/*var newProjectRef = db.collection("Projects").doc();
        newProjectRef.set({
            OwnerID: user.uid,
            ProjectName: projectName,
            ProjectDescription: projectDescription,
            Team: [user.email]
        }).then(function () {
            console.log("project created");
            alert("project created");
            create.reset();
            localStorage.setItem("docID", newProjectRef.id);
            localStorage.setItem("ownerID", user.uid);
            window.location.href = "projectOwner.html";
        }).catch(function (error) {
            console.log("error creating project: ", error);
        });*/
		var data = createProjectDocumentDataObject(
			projectName,
			projectDescription
		);
		var pid = '';
		createProjectDocument(data)
			.then((docRef) => {
				pid = docRef.id;
				var member = createProjectMemberDataObject(
					user.email,
					user.displayName,
					'product_owner'
				);
				return createProjectMemberDocument(member, pid, user.uid);
			})
			.then((value) => {
				var project = createUserProjectDataObject(
					projectDescription,
					projectName,
					'product_owner'
				);
				return createUserProjectDocument(project, pid, user.uid);
			})
			.then((value) => {
				console.log('project created');
				alert('project created');
				create.reset();
				localStorage.setItem('docID', newProjectRef.id);
				localStorage.setItem('ownerID', user.uid);
				window.location.href = 'projectOwner.html';
			})
			.catch(function (error) {
				console.error('error creating project: ', error);
			});
	} else {
		console.log('user does not exist');
	}
});
