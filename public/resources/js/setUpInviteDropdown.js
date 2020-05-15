const inviteList = document.querySelector('#inviteList');
const inviteBadge = document.querySelector('#inviteBadge');

const setUpInvites = (data) => {
	let html = '';
	var invCount = 0;
	data.forEach((doc) => {
		const inviteFrom = doc.data().inviteFromEmail;
		const project = doc.data().projectID;
		const docID = doc.id;
		const li = `
            <li><a href="#">${inviteFrom}<button type="button" class="acceptInviteButtons" onclick="acceptInvite('${project}','${docID}')">Accept</button><button type="button" class="declineInviteButtons" onclick="declineInvite('${docID}')">Decline</button></a></li>
        `;
		html = html + li;
		invCount = invCount + 1;
	});
	inviteList.innerHTML = html;
	let html2 = `Invites<span class="badge">${invCount}</span>`;
	inviteBadge.innerHTML = html2;
};

const acceptInvite = (data, data1) => {
	var user = auth.currentUser;
	var update = {
		team: firebase.firestore.FieldValue.arrayUnion(user.email),
	};
	updateDoc('projects', update, data).then(() => {
		deleteDoc('invites', data1)
			.then(function () {
				console.log('Document successfully deleted!');
			})
			.catch(function (error) {
				console.error('Error removing document: ', error);
			});
	});
};

const declineInvite = (data) => {
	deleteDoc('invites', data)
		.then(function () {
			console.log('Document successfully deleted!');
		})
		.catch(function (error) {
			console.error('Error removing document: ', error);
		});
};
