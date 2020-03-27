const ID = document.querySelector("#projectTitle");

const projectID = localStorage.getItem("docID");

db.collection("Projects").doc(projectID).get()
.then(function(doc) {
    if(doc.exists){
        //console.log(doc);
        ID.innerHTML = doc.data().ProjectName;
    }else{
        console.log("document does not exist");
    }
})
.catch(function(error) {
    alert("project could not be retrieved because of error: ", error);
})