//const { checkDateBeforeCurrentDate, checkIsNotANumber, isValidEmail, containsInput, isValidRepoLink } = require('../../../../testingCode/embeddedFunctions');

const addForm = document.querySelector("#add-form");

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const dev = addForm['add-email'].value;
    var user = auth.currentUser;

    if (isEmail(dev)) {
        addDev(dev, user)
    } else {
        db.collection("users").where('userDisplayName', '==', dev).onSnapshot((query) => {
            if (!query.empty) {
                const docs = query.docs;
                docs.forEach(doc => {
                    return addDev(doc.data().userEmail, user);
                })
            } else {
                toast("username doesn't exist");
            }
        });
    }
});

const addDev = (email, user) => {
    return db.collection("projects").doc(projectID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                if (doc.data().Team.includes(email)) {
                    console.log("in the team");
                    toast("developer is already in the team");
                } else {
                    return db.collection("users").where("userEmail", "==", email).get();

                }
            } else {
                console.log("project does not exist");
            }
        }).then((querySnapshot) => {
            if (!querySnapshot) {
                return;
            } else if (querySnapshot.size === 0) {
                toast("user doesn't exist");
            } else {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        return db.collection("Invites").doc().set({
                            inviteFromID: user.uid,
                            inviteToID: doc.id,
                            inviteFromEmail: user.email,
                            projectID: projectID,
                            projectName: projectName
                        }).then(() => {
                            toast("invite sent");
                        });
                    }
                });
            }
        }).catch((error) => {
            alert("error getting documents, " + error.message);
        });
}

const isEmail = (input) => {
    var flag = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        flag = true;
    }

    return flag;

}
