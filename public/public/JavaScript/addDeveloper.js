const addForm = document.querySelector("#add-form");

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const dev = addForm['add-email'].value;
    var user2 = auth.currentUser;

    db.collection("Users").where("userEmail", "==", dev).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    db.collection("Invites").doc().set({
                        inviteFromID: user2.uid,
                        inviteToID: doc.id,
                        inviteFromEmail: user2.email,
                        projectID: projectID
                    }).then(() => {
                        alert("invite sent");
                        addForm.reset();
                    });
                } else {
                    alert("user does not exist");
                }
            });
        }).catch((error) => {
            alert("error getting documents, ", error);
        });
});