const addForm = document.querySelector("#add-form");

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const dev = addForm['add-email'].value;
    var user = auth.currentUser;


    db.collection("projects").doc(projectID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                if (doc.data().Team.includes(dev)) {
                    console.log("in the team");
                    alert("developer is already in the team");
                } else {
                    db.collection("users").where("userEmail", "==", dev).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.exists) {
                                    db.collection("Invites").doc().set({
                                        inviteFromID: user.uid,
                                        inviteToID: doc.id,
                                        inviteFromEmail: user.email,
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
                }
            } else {
                console.log("project does not exist");
            }
        });
});
