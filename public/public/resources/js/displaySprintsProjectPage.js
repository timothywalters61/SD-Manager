function displayProjectsUserHome(title,startDate,endDate) {

    let WholeDiv = document.getElementById('displaySprints');
    // document.getElementById('noProjects').innerText = "";

    //This was just here for visualization, the project name and description will come be passed through as parameters
    //can comment it out
    // let title = document.getElementById('projectName').innerText;
    // let description= document.getElementById('projectDescription').innerText;


    let Title = title;
    let Desc = "Start Date: " + startDate + "/n" + "End Date: " + endDate;

    console.log(Title);
    console.log(Desc);

    //console.log(sprintDiv);

    let sprintDiv = document.createElement('div');
    sprintDiv.style = "background-color:#ECEFF1";
    sprintDiv.style.width = "300px";
    sprintDiv.style.marginLeft = "80px";
    sprintDiv.style.marginRight = "60px";
    sprintDiv.style.position = "relative";
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
    let UstoryBtt = document.createElement('button');
    //let task= document.createElement('div');
    UstoryBtt.style.border = '0px solid #3498db';
    UstoryBtt.style.padding = '6px 6px';
    UstoryBtt.style.marginTop = '-37px';
    //UstoryBtt.style.marginRight = '5px';
    //UstoryBtt.style.float = 'right';
    UstoryBtt.style.fontSize = '15px';
    UstoryBtt.style.cursor = 'pointer';
    UstoryBtt.style.backgroundColor = '#1a237e';
    //UstoryBtt.style.borderRadius = '10px';
    UstoryBtt.style.color = 'white';
    UstoryBtt.innerText = "View User Stories";
    UstoryBtt.style.fontFamily = 'Arial';
    // UstoryBtt.addEventListener('click', (e) => {
    //     e.preventDefault();
    //
    //     saveUserStoryID(docID);
    // });

    sprintDiv.style.borderRadius = "20px";
    sprintDiv.style.borderColor = "black #1a237e";
    sprintDiv.appendChild(newTitle);
    sprintDiv.appendChild(breakPoint);
    sprintDiv.appendChild(newDesc);
    sprintDiv.appendChild(breakPoint);
    sprintDiv.appendChild(breakPoint);
    sprintDiv.appendChild(breakPoint);
    sprintDiv.appendChild(UstoryBtt);

    WholeDiv.appendChild(sprintDiv);
}