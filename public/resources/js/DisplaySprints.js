
function AddSprint() {

    var sprintName = document.getElementById('sprintName').value;
    var startDate = document.getElementById('startDate').value;
    var dueDate = document.getElementById('dueDate').value;

    var newSprint = document.createElement("li");
    var newA = document.createElement('a');
    var getNav = document.getElementById('sprintList');

    newA.href = "SprintPage.html";
    newA.innerHTML = sprintName;
    newSprint.appendChild(newA);
    console.log(getNav);

    getNav.appendChild(newSprint);
    //
    //
    // var header = document.createElement('h4');
    // header.id = "2";
    // header.innerText = "";
    // document.body.appendChild(header);
    // document.getElementById('2').innerText = ""+header.id;
}