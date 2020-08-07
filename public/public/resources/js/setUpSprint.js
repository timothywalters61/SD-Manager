const sprint = document.querySelector('#sprintContainer');

const setUpSprint = (data) => {
    let html = '';
    data.forEach((doc) => {
        const li = `
        <div class="sprint-box"><a href="#" onclick="saveSprintID('${doc.id}')"></a><span>${doc.data().name}: from ${doc.data().start} to ${doc.data().end}</span></div>
        `;
        html = html + li;
    });
    sprint.innerHTML = html;
}

function saveSprintID(sprintID){
    localStorage.setItem("currentSprintID", sprintID);
    window.location.href = "dragDrop.html";
}