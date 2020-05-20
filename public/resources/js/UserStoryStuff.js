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
   let newTitle = document.createElement('h4');
   let newDesc = document.createElement('h6');
   let newPoints = document.createElement('h6');
   let newAcc = document.createElement('h6');
   let taskBtt = document.createElement('button');

   //taskBtt.classList.add("btn-indigo-darken-4 waves-effect-waves-dark");
   // taskBtt.appendChild(bttClass);
    taskBtt.style.border = '0px solid #3498db';
    taskBtt.style.padding = '10px 10px';
    taskBtt.style.fontSize = '15px';
    taskBtt.style.cursor = 'pointer';
    taskBtt.style.backgroundColor = '#1a237e';
    taskBtt.style.borderRadius = '10px';
   taskBtt.style.color = 'white';
   taskBtt.innerText = "View Tasks";
   taskBtt.style.fontFamily = 'Arial';

   newTitle.innerText = Title;
   newDesc.innerText = Desc;
   newPoints.innerText = "Points " + Points;
   newAcc.innerText = Acc;


    storyDiv.appendChild(newTitle);
    storyDiv.appendChild(newDesc);
    storyDiv.appendChild(newPoints);
    storyDiv.appendChild(newAcc);
    storyDiv.appendChild(taskBtt);

    WholeDiv.appendChild(storyDiv);


   // var title = document.getElementById('storyTitle').value;
   // var desc = document.getElementById('storyDescription').value;
   // var points = document.getElementById('Points').value;
   // var acc = document.getElementById('AccCrit').value;
   //
   // var newTitle = document.createElement("h4");
   // newTitle.innerHTML(title);
   // storyDiv.appendChild(newTitle);


}