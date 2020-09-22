var firebaseConfig = {
    apiKey: "AIzaSyB1akwPd-xOMCgU9_Bc6OqdTObTp10Sb5k",
    authDomain: "scrum-manager-91e13.firebaseapp.com",
    databaseURL: "https://scrum-manager-91e13.firebaseio.com",
    projectId: "scrum-manager-91e13",
    storageBucket: "scrum-manager-91e13.appspot.com",
    messagingSenderId: "332929508306",
    appId: "1:332929508306:web:5f1773dc956813db641e0b"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    const inviteBadge = document.querySelector("#inviteBadge");
    db.collection("Invites").where("inviteToID", "==", user.uid)
        .onSnapshot(function(snapshot) {
            if (snapshot.docs != 0) {
                let html = `<span class="badge">${snapshot.docs.length}</span> Invites`;
                inviteBadge.innerHTML = html;
            } else {
                console.log("invites do not exist");
                let html2 = '<span class="badge">0</span> Invites';
                inviteBadge.innerHTML = html2;
            }
        });
});

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);

        db.collection("users").doc(user.uid).get().then(function(doc) {

            let notifs = doc.data().notifications;
            console.log(notifs);
            localStorage.setItem("notifications", notifs);

            const notifDiv = document.getElementById("Notifications");


            for (let i = 0; i < notifs.length; i++) {
                console.log(notifs[i]);

                let nDiv = document.createElement("div");

                nDiv.innerText = notifs[i];
                notifDiv.appendChild(nDiv);
                //nDiv.style.padding = "5px";
                nDiv.style.margin = "10px";
                nDiv.style.backgroundColor = "white";
                nDiv.style.borderRadius = "10px";

                let btnDelete = document.createElement("button");
                nDiv.appendChild(btnDelete)
                btnDelete.className = "deleteBtn";
                btnDelete.id = "btnDeleteDiv";
                btnDelete.innerText = "delete";
                btnDelete.style.float = "right";

                /*btnDelete.style.margin = "0px";
                btnDelete.style.backgroundColor = "blue";
                btnDelete.style.color = "white";
                btnDelete.style.blockSize = "20px";
                btnDelete.style.*/



            }

        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


    } else {
        console.log("user logged out");
        window.location.href = "index.html";
    }
});

//logout

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
            //console.log("user has signed out");
        })
        .catch(function(error) {
            console.log("user failed to sign out because of error: ", error);
            alert(error.message);
        });
});
