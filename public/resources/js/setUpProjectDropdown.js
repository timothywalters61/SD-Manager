//populate project dropdown

const projectList = document.querySelector('#projectList');

const setUpProjects = (data) => {
	let html = '';
	data.forEach((doc) => {
		const project = doc.data();
		const projectName = project.name;
		const docID = doc.id;
		const li = `
            <li><a href="#" onclick="saveDocID('${docID}', '${project.owner_id}')">${projectName}</a></li>
        `;
		html = html + li;
	});
	projectList.innerHTML = html;
};

const saveDocID = (data, data1) => {
	var user = auth.currentUser;
	localStorage.setItem('docID', data);
	localStorage.setItem('ownerID', data1);
	if (data1 === user.uid) {
		window.location.href = 'projectOwner.html';
	} else {
		window.location.href = 'projectDeveloper.html';
	}
	//console.log(localStorage.getItem("docID"));
};
