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

            console.log(notifs.length +" Notifications");
            let notifBadge = document.getElementById('notifications');
            notifBadge.innerText = notifs.length +" Notifications";
            console.log(notifBadge);

            const notifDiv = document.getElementById("Notifications1");


            for (let i = notifs.length - 1; i >= 0; i--) {
                console.log(notifs[i]);
                let type = notifs[i].split("#")
                console.log(type[0],">>>>",type[1]);

                if( type[1] == "s"){
                    console.log("its a sprint");
                    let separ = type[0].split("is a new sprint in");
                    console.log(separ[0]+">>>"+separ[1]);
                }
                else if(type[1] == "u"){
                    console.log("its a user story");
                    let separ = type[0].split("is a new user story in");
                    console.log(separ[0]+">>>"+separ[1]);
                } 
                else if (type[1] == "t"){
                    console.log("its a task");
                    let separ = type[0].split("is a new task in");
                    console.log(separ[0]+">>>"+separ[1]);
                }

                let nDiv = document.createElement("div");

                nDiv.innerText = type[0];
                notifDiv.appendChild(nDiv);
                nDiv.style.padding = "20px";
                nDiv.style.margin = "10px";
                nDiv.style.backgroundColor = "white";
                nDiv.style.borderRadius = "10px";

                let btnDelete = document.createElement("button");
                nDiv.appendChild(btnDelete)
                btnDelete.className = "deleteBtn";
                btnDelete.id = "btnDeleteDiv";
                btnDelete.innerText = "Delete";
                btnDelete.style.float = "right";
                btnDelete.addEventListener('click', function(){
                    db.collection("users").doc(user.uid).update({
                        notifications: firebase.firestore.FieldValue.arrayRemove(notifs[i])
                    }).then(function(){
                        window.location.href = "Notifications.html";
                    })
                });
                

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
