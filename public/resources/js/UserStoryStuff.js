function AddUserStory() {

    let WholeDiv = document.getElementById('displayStories');

    document.getElementById('default').innerText = "";
   let Title = document.getElementById('storyTitle').value;
   let Desc = document.getElementById('storyDescription').value;
   let Points = document.getElementById('Points').value;
    let Acc = document.getElementById('AccCrit').value;

   console.log(Title);
    console.log(Desc);
    console.log(Points);
    console.log(Acc);
    //console.log(storyDiv);

   let storyDiv = document.createElement('div');
   storyDiv.style = "background-color: #ffffff";
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

    //
    // content.appendChild(task);




   //let newTitle = document.createElement('h4');


   //taskBtt.classList.add("btn-indigo-darken-4 waves-effect-waves-dark");
   // taskBtt.appendChild(bttClass);
   //  taskBtt.style.border = '0px solid #3498db';
   //  taskBtt.style.padding = '10px 10px';
   //  taskBtt.style.fontSize = '15px';
   //  taskBtt.style.cursor = 'pointer';
   //  taskBtt.style.backgroundColor = '#1a237e';
   //  taskBtt.style.borderRadius = '10px';
   // taskBtt.style.color = 'white';
   // taskBtt.innerText = "View Tasks";
   // taskBtt.style.fontFamily = 'Arial';
   //
   // newTitle.innerText = Title;
   // newDesc.innerText = Desc;
   // newPoints.innerText = "Points " + Points;
   // newAcc.innerText = Acc;


   // var title = document.getElementById('storyTitle').value;
   // var desc = document.getElementById('storyDescription').value;
   // var points = document.getElementById('Points').value;
   // var acc = document.getElementById('AccCrit').value;
   //
   // var newTitle = document.createElement("h4");
   // newTitle.innerHTML(title);
   // storyDiv.appendChild(newTitle);


}