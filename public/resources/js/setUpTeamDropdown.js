const teamList = document.querySelector("#teamList");

const setUpTeam = (data) => {
    let html = '';
    var i;
    for(i = 0 ; i < data.length ; ++i){
        const li = `
            <li><a href="#">${data[i]}</a></li>
        `;
        html = html + li;
    }
    teamList.innerHTML = html;
}