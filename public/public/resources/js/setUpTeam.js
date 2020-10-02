const teamList = document.querySelector("#teamContainer");

const setUpTeam = async (data) => {
    
    console.log('setting up team...');
    for (let i = 0; i < data.length; i++) {
        await db.collection('users').where('userEmail', '==', data[i]).onSnapshot((query) => {
            //console.log(query);
            if (!query.empty) {
                const docs = query.docs;
                docs.forEach(doc => {
                    const username = doc.data().userDisplayName;
                    const li = `
                    <div class="teamMember"><strong>${username}</strong> &lt${data[i]}&gt</div>
                    `;
                    teamList.innerHTML += li;
                });
            }
        });
    }

    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
        if (user) {

            db.collection("users").doc(user.uid).get().then(function(doc) {
                let notifs = doc.data().notifications;
                console.log(notifs.length);
        
                let notifBadge = document.getElementById('notifications');
                notifBadge.innerText = notifs.length +" Notifications";
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        }
    });

    
    
};