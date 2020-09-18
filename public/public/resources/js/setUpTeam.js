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
    
};