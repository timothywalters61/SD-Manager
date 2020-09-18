//populate project dropdown

const projectBox = document.querySelector("#projectContainer");

const setUpProjects = (data) => {
    let html = '';
    data.forEach(doc => {
        const project = doc.data();
        const projectName = project.name;
        const docID = doc.id;
        /**
         *
         * I used the docID as the id of the div
         * this makes it possible to know which project
         * is to be deleted. when you press a project, an alert will popup
         */
        const li = `
            <div id='${docID}' class="project-box">
            <a href="#" onclick="saveDocID('${docID}', '${project.OwnerID}', '${projectName}')"></a><span>${projectName}</span>
            </div>
        `;
        html = html + li;
    });
    projectBox.innerHTML = html;
}

const saveDocID = (data, data1, data2) => {
    //I'M NEW
    //opens alert dialog
    //you can learn more about the alert dialog here, https://sweetalert.js.org/
    swal({
            text: "What do you want to do with this project",
            icon: "info",
            buttons: { //declaring the buttons in the alert dialog
                cancel: true,
                deleteProject: {
                    text: "Delete Project",
                    value: "delete",
                    dangerMode: true
                },
                openProject: {
                    text: "Open Project",
                    value: "open"
                }

            },
            closeOnClickOutside: true,
        })
        .then((selectedOption) => {
            switch (selectedOption) { //check which button was pressed
                case "open":
                    var user = auth.currentUser;
                    localStorage.setItem("docID", data);
                    localStorage.setItem("ownerID", data1);
                    localStorage.setItem("docName", data2);
                    if (data1 === user.uid) {
                        localStorage.setItem("prevPage", "userHome.html");
                        window.location.href = "projectOwner.html";
                    } else {
                        localStorage.setItem("prevPage", "userHome.html");
                        window.location.href = "projectDeveloper.html";
                    }
                    break;

                case "delete":
                    //TODO: send project id (data) so that it gets deleted, then after getting response, you can then remove project from the fontend
                    //below is the code that removes the project on front-end
                    let project = document.getElementById(data);
                    project.remove();
                    swal({
                        text: "Project deleted",
                        icon: "success"
                    })
                    break;
            }
        });


    //console.log(localStorage.getItem("docID"));
}
