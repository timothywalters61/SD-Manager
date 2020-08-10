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

// get required values from local storage
const auth = firebase.auth();
const db = firebase.firestore();
const projectID = localStorage.getItem("docID");
const ownerID = localStorage.getItem("ownerID");
const currentSprintID = localStorage.getItem("currentSprintID");
const projectName = localStorage.getItem("docName");

// display project title
const projectTitle = document.querySelector("#PageHeading");
let heading = `<p>Project: ${projectName}</p>`;
projectTitle.innerHTML = heading;

// display sprint title
const sprintHeading = document.querySelector('#subPageHeading');
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).get().then((doc) => {
    let html = `<p>Sprint: ${doc.data().name}</p>`;
    sprintHeading.innerHTML = html;
});

// add link to github
const gitLink = document.querySelector('#gitLink');
db.collection("projects").doc(projectID)
    .onSnapshot(function (doc) {
        let git = `<a href="${doc.data().repository}">Git</a>`;
        gitLink.innerHTML = git;
    });



// display pending invites
auth.onAuthStateChanged(user => {
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


// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
        
        window.location.href = "index.html";
    })
        .catch(function (error) {
            console.log("user failed to sign out because of error: ", error);
            alert(error.message);
        });
});


// refernces to categories or columns
const NS = document.getElementById("NotStarted");
const IP= document.getElementById("In Progress");
const C = document.getElementById("Completed");


let wholeDiv;
let userIDs = new Map();

// display user stories
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists) {

            // get user story data into variables
            const name = doc.data().name;
            const status = doc.data().status;
            const description = doc.data().description;
            const acceptance = doc.data().acceptance;
            const points = doc.data().points;
            userIDs.set(name, {id : doc.id}); // adds user story name and id to be used later

            // create div with inner components to hold user story data
            wholeDiv = document.createElement('div');
            wholeDiv.draggable = true;
            wholeDiv.className = "stories";

            let n = document.createElement('p'); //name comp
            n.className = "userStoryName"
            n.innerText= name;

            let des = document.createElement('p'); //description comp
            des.className = "description";
            des.innerText = description;

            let acc = document.createElement('p'); //acceptance comp
            acc.className = "acceptance";
            acc.innerText = acceptance;

            let p = document.createElement('p'); // points comp
            p.className = "points";
            p.innerText = points;

            let btnTask = document.createElement('button'); // moves to task page
            btnTask.className = "userStoryBtn";
            btnTask.addEventListener( "click" , function(){
                saveUserStoryID(doc.id); // saves id of user story clicked

            });
            btnTask.innerText = "View Tasks";

            wholeDiv.appendChild(n);
            wholeDiv.appendChild(des);
            wholeDiv.appendChild(acc);
            wholeDiv.appendChild(p);
            wholeDiv.append(btnTask);

            // attaches user story to the relevant column
            // 1 : not started
            // 2 : in progress
            // 3 : completed
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


        } else {
            console.log("user story doesnt exist");
        }
    });

    const stories = document.querySelectorAll('.stories');
    const categories = document.querySelectorAll('.categories');

    let dragStory = null;

    // set event listeners for drag and drop for each user story in each column
    for(let a = 0; a < stories.length;a++) {
        const story = stories[a];

        // when story is starting to drag
        story.addEventListener('dragstart', function() {
            console.log("You are dragging an item");
            dragStory = story;
            setTimeout(function () {

                story.style.display = 'none';

            },0);
        });

        // when story is stopping drag
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

                if(parentID == "NotStarted"){
                   // console.log(parentID,"1");
                    newStatus = 1;
                    //console.log("Amount of stories in Not Started ",NS.childElementCount-1);
                }
                else if(parentID == "In Progress"){
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

                db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").doc(test.id)
                .set({
                    SprintID: currentSprintID,
                    name : name,
                    description: des,
                    acceptance: acc,
                    points: points,
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

function addStoryDynam(){
    ns = document.getElementById('Not Started'); //get column element
    nsInner = ns.innerHTML; // get contents of column
    ns.innerHTML = nsInner + '<br><div class="stories" draggable="true">Item 1</div>'; // append new content to column contents

}
