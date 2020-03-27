//populate project dropdown

const projectList = document.querySelector("#projectList");

const setUpProjects = (data) => {
    let html = '';
    data.forEach(doc => {
        const project = doc.data();
        const projectName = project.ProjectName;
        const docID = doc.id;
        const li = `
            <li><a href="projectOwner.html" onclick="saveDocID('${docID}')">${projectName}</a></li>
        `;
        html = html + li;
    });
    projectList.innerHTML = html;
}

const saveDocID = (data) => {
    localStorage.setItem("docID",data);
    //console.log(localStorage.getItem("docID"));
}