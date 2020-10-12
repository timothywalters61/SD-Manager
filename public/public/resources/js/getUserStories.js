var firebaseConfig = {
    apiKey: "AIzaSyB1akwPd-xOMCgU9_Bc6OqdTObTp10Sb5k",
    authDomain: "scrum-manager-91e13.firebaseapp.com",
    databaseURL: "https://scrum-manager-91e13.firebaseio.com",
    projectId: "scrum-manager-91e13",
    storageBucket: "scrum-manager-91e13.appspot.com",
    messagingSenderId: "332929508306",
    appId: "1:332929508306:web:5f1773dc956813db641e0b"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const projectID = localStorage.getItem("docID");
const ownerID = localStorage.getItem("ownerID");
const currentSprintID = localStorage.getItem("currentSprintID");
const projectName = localStorage.getItem("docName");


//let userStoryHTML = '<h2 id = "NS">Not Started</h2>';
//const storyListLink = document.querySelector('#NotStarted'); // object representing that div

const projectTitle = document.querySelector("#PageHeading");
let heading = `<p>${projectName}</p>`;
projectTitle.innerHTML = heading;

const sprintHeading = document.querySelector('#subPageHeading');
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).get().then((doc) => {
    let html = `<p>${doc.data().name}</p>`;
    sprintHeading.innerHTML = html;
});

const gitLink = document.querySelector('#gitLink');
db.collection("projects").doc(projectID)
    .onSnapshot(function (doc) {
        let git = `<a href="${doc.data().repository}">Git</a>`;
        gitLink.innerHTML = git;
    });


auth.onAuthStateChanged(user => {

    db.collection("users").doc(user.uid).get().then(function(doc) {
        let notifs = doc.data().notifications;
        console.log(notifs.length);

        let notifBadge = document.getElementById('notifications');
        notifBadge.innerText = notifs.length +" Notifications";
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    const inviteBadge = document.querySelector("#inviteBadge");
    db.collection("Invites").where("inviteToID", "==", user.uid)
        .onSnapshot(function (snapshot) {
            if (snapshot.docs != 0) {
            let html = `<span class="badge">${snapshot.docs.length}</span> Invites`;
            inviteBadge.innerHTML = html;
        } else {
            console.log("invites do not exist");
            let html2 = '<span class="badge">0</span> Invites';
            inviteBadge.innerHTML = html2;
        }
    });
});



const NS = document.getElementById("NotStarted");
const IP= document.getElementById("In-Progress");
const C = document.getElementById("Completed");


let wholeDiv;
let userIDs = new Map();

db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists) {
            const name = doc.data().name;
            //console.log(name);

            //Lines of code supposed to fetch current status of user stories but I got errors with access
            const status = doc.data().status;
            //console.log("Original Status ",status);

            const description = doc.data().description;
            //console.log(description);
            const acceptance = doc.data().acceptance;
            //console.log(acceptance);
            const points = doc.data().points;
            //console.log(points);
            // li= `<div class="stories" draggable = "true"><p class="userStoryName">${name}</p><p class="description">${description}</p><p class="acceptance">Acceptance: ${acceptance}</p><p class="points">Points: ${points}</p><button class="userStoryBtn" onclick="saveUserStoryID('${doc.id}')">View Tasks</button></div>`;
            //userStoryHTML = userStoryHTML + li;

            //console.log(name , "    ", `${doc.id}`);
            userIDs.set(name, {id : doc.id});

            wholeDiv = document.createElement('div');
            wholeDiv.draggable = true;
            wholeDiv.className = "stories";
            let n = document.createElement('p');
            n.className = "userStoryName"
            n.innerText= name;
            let des = document.createElement('p');
            des.className = "description";
            des.innerText = description;
            des.hidden = true;
            let acc = document.createElement('p');
            acc.className = "acceptance";
            acc.innerText = acceptance;
            acc.hidden = true;
            let p = document.createElement('p');
            p.className = "points";
            p.innerText = points;
            p.hidden = true;

            // TASK BUTTON
             //let btnTask = document.createElement('button');
             let btnTask = document.createElement('a');
             //btnTask.href = "Task.html"
             btnTask.className = "userStoryBtn";

            btnTask.addEventListener('click',function(e) {
                console.log("in");
                localStorage.setItem("userStoryID", doc.id);
                window.location.href = "Task.html";
                console.log("This Code has Executed");
            });
            // const id = doc.id;
            // //btnTask.className = "TaskBTT";
            // console.log(`${doc.id}`); // displays userstory ID in console. We need to save the user story ID so that the relevant tasks can be accessed
            // btnTask.onmousedown= saveUserStoryID(`$id`); // function found in saveUserStory.js should save user story to localstorage and then go to task html
            btnTask.innerText = "View Tasks";

            let btnDeleteUS = document.createElement('button'); // moves to task page
            btnDeleteUS.className = "userStoryBtn";
            btnDeleteUS.id = "btnDelete";
            btnDeleteUS.innerText = "Delete"

            // for some reason its not going to this function

            //<button class="userStoryBtn" onclick="saveUserStoryID('${doc.id}')">View Tasks</button>
            wholeDiv.appendChild(n);
             wholeDiv.appendChild(des);
             wholeDiv.appendChild(acc);
             wholeDiv.appendChild(p);
            wholeDiv.append(btnTask);
            wholeDiv.append(btnDeleteUS);
            btnTask.style.float = "right";
            btnTask.style.marginTop = "20px";
            btnDeleteUS.style.float = "left";
            btnDeleteUS.style.marginTop = "20px";
            // NS.appendChild(wholeDiv);

            wholeDiv.addEventListener('click',function(e) {
                let title = document.getElementById("Title");
                let desc = document.getElementById("Description");
                let Acc = document.getElementById("Acc");
                let points = document.getElementById("Point");
                title.innerText=n.innerText;
                desc.innerText=des.innerText;
                Acc.innerText=acc.innerText;
                points.innerText=p.innerText;
                showFullUserStoryForm();
            });

            //If statements attach stories to the correct status columns
            if (status === 1) {
                NS.appendChild(wholeDiv);
            }

            else if (status === 2) {
               IP.appendChild(wholeDiv);
            }

            else if (status === 3) {
                C.appendChild(wholeDiv);
            }

            else {
               NS.appendChild(wholeDiv);
                }

            //console.log("Amount of stories in Not Started ",NS.childElementCount-1);
            //console.log("Amount of stories in In Progress ", IP.childElementCount-1);
            //console.log("Amount of stories in Completed ", C.childElementCount-1);

            // storyListLink.appendChild(userStoryHTML);

        } else {
            console.log("user story doesnt exist");
        }
        // storyListLink.innerHTML = userStoryHTML;
    });
/*
    console.log(userIDs);
    let test = userIDs.get("user story 3 ");
    console.log("user id \n",test);
    console.log("id ", test.id);
          */
    //setTimeout(dragDrop , 3000);

    const stories = document.querySelectorAll('.stories');
    const categories = document.querySelectorAll('.categories');

    // console.log(stories);
    // console.log(categories);


    let dragStory = null;

    console.log('stories ', stories);
    console.log('len ',stories.length);
    for(let a = 0; a < stories.length;a++)
    {
        const story = stories[a];
        console.log(a);
        //console.log(story.parentElement.id);

        deleteButton = story.querySelector("#btnDelete");
        deleteButton.addEventListener('click' , function(){
            let usName = story.querySelector(".userStoryName").innerText;
            console.log("name" , usName, "lknkfd")
            console.log("map" , userIDs);
            let deleteID = userIDs.get(usName).id;
            db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(deleteID).delete().then(function() {
                console.log("Document successfully deleted!");
                window.location.href = "dragDrop.html";


            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            console.log(deleteID);

            
        });

        story.addEventListener('dragstart', function(e) {
            console.log("dragstart", e);
            console.log("You are dragging an item");

            dragStory = story;



            setTimeout(function () {

                story.style.display = 'none';

            },0);
        });

        story.addEventListener('dragend',function () {
            console.log("You are no longer dragging an item");
            setTimeout(function () {

                story.style.display = 'block';
                dragStory=null;
            },0);
        });


        for (let b = 0; b < categories.length;b++) {
            const category = categories[b];

            category.addEventListener('dragover', function (e) {

                e.preventDefault();

            });

            category.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = '#778899';

            });

            category.addEventListener('dragleave', function () {
                this.style.backgroundColor = 'whitesmoke';

            })

            category.addEventListener('drop',function (ev) {

                category.appendChild(dragStory);
                //console.log("drag story === ",dragStory);

                let name = dragStory.querySelector('.userStoryName').innerText;
                //console.log(name);
                let des = dragStory.querySelector('.description').innerText;
                //console.log(des);

                let points = dragStory.querySelector('.points').innerText;
                //console.log(points);

                let acc = dragStory.querySelector('.acceptance').innerText;
                //console.log(acc);



                //console.log(dragStory.parentElement.id);
                // console.log(category.childElementCount);
              
                let newStatus = 0;
                let parentID = dragStory.parentElement.id;
                console.log("parent id   " + parentID);

                if(parentID == "NotStarted"){
                   // console.log(parentID,"1");
                    newStatus = 1;
                    //console.log("Amount of stories in Not Started ",NS.childElementCount-1);
                }
                else if(parentID == "In-Progress"){
                   // console.log(parentID,"2");

                    newStatus = 2;
                    //console.log("Amount of stories in In Progress ", IP.childElementCount-1);
                }
                else if(parentID == "Completed"){
                   // console.log(parentID,"3");

                    newStatus = 3;
                    //console.log("Amount of stories in Completed ", C.childElementCount-1);
                }

               console.log("new status of story", newStatus);

               
                console.log(userIDs);
                let test = userIDs.get(name);
                console.log("user id \n",test);
                console.log("id ", test.id);

                /*db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(test.id)
                .set({
                    SprintID: currentSprintID,
                    name : name,
                    description: des,
                    acceptance: acc,
                    points: points,
                    status: newStatus
                });*/

                db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(test.id).update({
                    status: newStatus
                });


                console.log("h");


                this.style.backgroundColor = 'whitesmoke';

            });
        }
    }
});

function dragDrop() {
    alert('hello');
}

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
        //console.log("user has signed out");
    })
        .catch(function (error) {
            console.log("user failed to sign out because of error: ", error);
            alert(error.message);
        });
});

function addStoryDynam(){
    ns = document.getElementById('Not Started'); //get column element
    nsInner = ns.innerHTML; // get contents of column
    ns.innerHTML = nsInner + '<br><div class="stories" draggable="true">Item 1</div>'; // append new content to column contents

}
