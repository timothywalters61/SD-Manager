const ID = document.querySelector("#projectTitle");

db.collection("Projects").doc(projectID).get()
.then(function(doc) {
    if(doc.exists){
        //console.log(doc);
        ID.innerHTML = doc.data().ProjectName;
    }else{
        console.log("document does not exist");
        window.location.href = "userHome.html";
    }
})
.catch(function(error) {
    alert("project could not be retrieved because of error: ", error);
})