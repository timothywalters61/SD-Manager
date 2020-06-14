const teamList = document.querySelector("#teamContainer");

const setUpTeam = (data) => {
    let html = '';
    var i;
    for(i = 0 ; i < data.length ; ++i){
        console.log(data[i]);
        const li = `
        <div class="teamMember">${data[i]}</div>
        `;
        html = html + li;
    }
    teamList.innerHTML = html;
}