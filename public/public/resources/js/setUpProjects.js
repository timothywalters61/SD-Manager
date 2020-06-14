//populate project dropdown

const projectBox = document.querySelector("#projectContainer");

const setUpProjects = (data) => {
    let html = '';
    data.forEach(doc => {
        const project = doc.data();
        const projectName = project.name;
        const docID = doc.id;
        const li = `
            <div class="project-box"><a href="#" onclick="saveDocID('${docID}', '${project.OwnerID}', '${projectName}')"></a><span>${projectName}</span></div>
        `;
        html = html + li;
    });
    projectBox.innerHTML = html;
}

const saveDocID = (data,data1,data2) => {
    var user = auth.currentUser;
    localStorage.setItem("docID",data);
    localStorage.setItem("ownerID",data1);
    localStorage.setItem("docName",data2);
    if(data1 === user.uid){
        window.location.href = "projectOwner.html";
    }else{
        window.location.href = "projectDeveloper.html";
    }
    //console.log(localStorage.getItem("docID"));
}