function displayProjectsUserHome(title,description) {

    let WholeDiv = document.getElementById('displayProjects');
    document.getElementById('noProjects').innerText = "";

    //This was just here for visualization, the project name and description will come be passed through as parameters
    //can comment it out
    // let title = document.getElementById('projectName').innerText;
    // let description= document.getElementById('projectDescription').innerText;


    let Title = title;
    let Desc = description;

    console.log(Title);
    console.log(Desc);

    //console.log(projDiv);

    let projDiv = document.createElement('div');
    projDiv.style = "background-color:#ECEFF1";
    projDiv.style.width = "300px";
    projDiv.style.marginLeft = "80px";
    projDiv.style.marginRight = "60px";
    projDiv.style.position = "relative";
    console.log("created");

    //let txtA = document.createElement('textarea');

    let newTitle = document.createElement('h5');
    console.log("created");

    let newDesc = document.createElement('h6');
    let breakPoint = document.createElement('BR');

    newTitle.innerText = Title;
    newTitle.style.width = "100px";
    newTitle.style.backgroundColor = '#1a237e';
    newTitle.style.borderRadius = "5px";
    newTitle.style.color = "#e0e0e0";
    newTitle.style.padding = '3px 3px';
    newDesc.innerText = Desc;
    newDesc.style.color = "#000000";
    let sprintBtt = document.createElement('button');
    //let task= document.createElement('div');
    sprintBtt.style.border = '0px solid #3498db';
    sprintBtt.style.padding = '6px 6px';
    sprintBtt.style.marginTop = '-37px';
    //sprintBtt.style.marginRight = '5px';
    //sprintBtt.style.float = 'right';
    sprintBtt.style.fontSize = '15px';
    sprintBtt.style.cursor = 'pointer';
    sprintBtt.style.backgroundColor = '#1a237e';
    //sprintBtt.style.borderRadius = '10px';
    sprintBtt.style.color = 'white';
    sprintBtt.innerText = "View Sprints";
    sprintBtt.style.fontFamily = 'Arial';
    // sprintBtt.addEventListener('click', (e) => {
    //     e.preventDefault();
    //
    //     saveUserStoryID(docID);
    // });

    projDiv.style.borderRadius = "20px";
    projDiv.style.borderColor = "black #1a237e";
    projDiv.appendChild(newTitle);
    projDiv.appendChild(breakPoint);
    projDiv.appendChild(newDesc);
    projDiv.appendChild(breakPoint);
    projDiv.appendChild(breakPoint);
    projDiv.appendChild(breakPoint);
    projDiv.appendChild(sprintBtt);

    WholeDiv.appendChild(projDiv);
}