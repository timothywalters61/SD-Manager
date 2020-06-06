function displayUserStoryAsCard(title, description, acceptance, points, docID) {

    let WholeDiv = document.getElementById('displayStories');

    document.getElementById('default').innerText = "";
   let Title = title;
   let Desc = description;
   let Points = points;
    let Acc = acceptance;

   console.log(Title);
    console.log(Desc);
    console.log(Points);
    console.log(Acc);
    //console.log(storyDiv);

   let storyDiv = document.createElement('div');
   storyDiv.style = "background-color:#ECEFF1";
   storyDiv.style.width = "1000px";
   storyDiv.style.marginLeft = "auto";
   storyDiv.style.marginRight = "auto";
    console.log("created");

   //let txtA = document.createElement('textarea');

    let newTitle = document.createElement('h5');
    console.log("created");

    let newDesc = document.createElement('h6');
    let newPoints = document.createElement('h6');
    let newAcc = document.createElement('h6');
    let breakPoint = document.createElement('BR');

    newTitle.innerText = Title;
    newTitle.style.width = "500px";
    newTitle.style.backgroundColor = '#1a237e';
    newTitle.style.borderRadius = "5px";
    newTitle.style.color = "#e0e0e0";
    newTitle.style.padding = '10px 10px';
    newDesc.innerText = Desc;
    newDesc.style.color = "#000000";
    newPoints.innerText = "Points " + Points;
    newPoints.style.color = "#000000";
    newAcc.innerText = Acc;
    newAcc.style.color = "#000000";

   let taskBtt = document.createElement('button');
    //let task= document.createElement('div');
    taskBtt.style.border = '0px solid #3498db';
    taskBtt.style.padding = '10px 10px';
    taskBtt.style.marginTop = '-37px';
    //taskBtt.style.marginRight = '5px';
    //taskBtt.style.float = 'right';
    taskBtt.style.fontSize = '15px';
    taskBtt.style.cursor = 'pointer';
    taskBtt.style.backgroundColor = '#1a237e';
    //taskBtt.style.borderRadius = '10px';
    taskBtt.style.color = 'white';
    taskBtt.innerText = "View Tasks";
    taskBtt.style.fontFamily = 'Arial';
    taskBtt.addEventListener('click', (e) => {
        e.preventDefault();

        saveUserStoryID(docID);
    });

    storyDiv.style.borderRadius = "20px";
    storyDiv.style.borderColor = "black #1a237e";
 storyDiv.appendChild(newTitle);
 storyDiv.appendChild(breakPoint);
  storyDiv.appendChild(newDesc);
 storyDiv.appendChild(newPoints);
 storyDiv.appendChild(breakPoint);
 storyDiv.appendChild(newAcc);
 storyDiv.appendChild(breakPoint);
 storyDiv.appendChild(breakPoint);
 storyDiv.appendChild(taskBtt);

 WholeDiv.appendChild(storyDiv);
}