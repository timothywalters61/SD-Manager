const sprint = document.querySelector('#sprintList');

const setUpSprint = (data) => {
    let html = '';
    data.forEach((doc) => {
        const li = `
        <li><a href="#" onclick="saveSprintID('${doc.id}')">${doc.data().name}</a></li>
        `;
        html = html + li;
    });
    sprint.innerHTML = html;
}

function saveSprintID(sprintID){
    localStorage.setItem("currentSprintID", sprintID);
    window.location.href = "Sprint.html";
}