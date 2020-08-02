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

const NS = document.getElementById("NotStarted");
const IP= document.getElementById("In Progress");
const C = document.getElementById("Completed");


let wholeDiv;
                    
db.collection("projects").doc(projectID).collection("sprints").doc(currentSprintID).collection("backlog").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists) {
            const name = doc.data().name;
            console.log(name);

            //Lines of code supposed to fetch current status of user stories but I got errors with access
            // const status = doc.data().status;
            console.log(status);

            const description = doc.data().description;
            console.log(description);
            const acceptance = doc.data().acceptance;
            console.log(acceptance);
            const points = doc.data().points;
            console.log(points);
            // li= `<div class="stories" draggable = "true"><p class="userStoryName">${name}</p><p class="description">${description}</p><p class="acceptance">Acceptance: ${acceptance}</p><p class="points">Points: ${points}</p><button class="userStoryBtn" onclick="saveUserStoryID('${doc.id}')">View Tasks</button></div>`;
            //userStoryHTML = userStoryHTML + li;

            wholeDiv = document.createElement('div');
            wholeDiv.draggable = true;
            wholeDiv.className = "stories";
            let n = document.createElement('p');
            n.innerText= name;
            let des = document.createElement('p');
            des.innerText = description;
            let acc = document.createElement('p');
            acc.innerText = acceptance;
            let p = document.createElement('p');
            p.innerText = points;
            wholeDiv.appendChild(n);
            wholeDiv.appendChild(des);
            wholeDiv.appendChild(acc);
            wholeDiv.appendChild(p);
            // NS.appendChild(wholeDiv);

            //If statements attach stories to the correct status columns
            if (status == 1) {
                NS.appendChild(wholeDiv);
            }

            else if (status == 2) {
               IP.appendChild(wholeDiv);
            }

            else if (status == 3) {
                C.appendChild(wholeDiv);
            }

            else {
              IP.appendChild(wholeDiv);
            }

            //console.log(wholeDiv.parentElement.id);
            console.log(NS.childNodes);

            const stories = document.querySelectorAll('.stories');
            const categories = document.querySelectorAll('.categories');

            console.log(stories);
            console.log(categories);


            let dragStory = null;


            for(var a = 0; a < stories.length;a++)
            {
                const story = stories[a];
                console.log(story.parentElement.id);

                story.addEventListener('dragstart', function() {
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


                for (var b = 0; b < categories.length;b++) {
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
                        console.log(dragStory.parentElement.id);
                        console.log(category.childElementCount);



                        this.style.backgroundColor = 'whitesmoke';

                    });
                }
            }



            // storyListLink.appendChild(userStoryHTML);
        } else {
            console.log("user story doesnt exist");
        }
        // storyListLink.innerHTML = userStoryHTML;



    });
});

function addStoryDynam(){
    ns = document.getElementById('Not Started'); //get column element
    nsInner = ns.innerHTML; // get contents of column
    ns.innerHTML = nsInner + '<br><div class="stories" draggable="true">Item 1</div>'; // append new content to column contents

}
