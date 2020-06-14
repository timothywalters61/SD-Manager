const inviteList = document.querySelector("#inviteContainer");

const setUpInvites = (data) => {
    let html = '';
    data.forEach(doc => {
        const inviteFrom = doc.data().inviteFromEmail;
        const project = doc.data().projectID;
        const docID = doc.id;
        const projectName = doc.data().projectName;
        const li = `
        <div class="invites">${inviteFrom} has invited you to join their team and help develop ${projectName} <button type="button" class="acceptInviteButtons" onclick="acceptInvite('${project}','${docID}')">Accept</button><button type="button" class="declineInviteButtons" onclick="declineInvite('${docID}')">Decline</button></div>
        `;
        html = html + li;
    });
    inviteList.innerHTML = html;
}

const acceptInvite = (data,data1) => {
    var user = auth.currentUser;
    db.collection("users").doc(user.uid).update({
        projects: firebase.firestore.FieldValue.arrayUnion(data)
    });
    db.collection("projects").doc(data).update({
        Team: firebase.firestore.FieldValue.arrayUnion(user.email)
    }).then(() => {
        toast("project joined");
        db.collection("Invites").doc(data1).delete()
        .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    });
}

const declineInvite = (data) => {
    db.collection("Invites").doc(data).delete()
    .then(function() {
        toast("project declined");
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}