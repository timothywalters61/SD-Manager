// start sprint for project
console.log("hello world");

const startSprint = document.querySelector("#sprint-form");
startSprint.addEventListener('submit', (e) => {
    e.preventDefault();
    const sprintName = startSprint['sprint-name'].value;
    const startDate = startSprint['startDate'].value;
    const endDate = startSprint['endDate'].value;
    var today = new Date();

    
    var startd = new Date(startDate);
    let endd =  new Date(endDate);

    console.log("swap",startd > endd);
    console.log("bad date", startd < today);
    let test = parseInt("2020");

    if (startd < today) {
        //toast("startdate already past");
        showSprintdateForm();
        const startdateSprint = document.querySelector("#sprintdate-form");
        startdateSprint.addEventListener('submit', (e) => {
            e.preventDefault();
            //toast("chose to continue");
            console.log("updated");
            db.collection("projects").doc(projectID).collection("sprints").add({
                name: sprintName,
                starts: startDate,
                pointTotal: 0,
                end: endDate
            })
            .then((doc) => {
                localStorage.setItem("currentSprintID", doc.id);
                db.collection("projects").doc(projectID).update({
                        "Sprints": "started"
                    })
                    .then(() => {
                        startSprint.reset();
                        window.location.href = "dragDrop.html";
                    });
            })
            .catch((error) => {
                alert("an error occured", error);
            });
            console.log("chose to continue");
        });
    }
    else if(startd > endd){
        toast("dates messed up");

        showSprintdateSwapForm();
        const startdateSwapSprint = document.querySelector("#sprintdateSwap-form");
        startdateSwapSprint.addEventListener('submit', (e) => {
            e.preventDefault();
            //toast("dates messed up");
            db.collection("projects").doc(projectID).collection("sprints").add({
                name: sprintName,
                start: startDate,
                pointTotal: 0,
                end: endDate
            })
            .then((doc) => {
                localStorage.setItem("currentSprintID", doc.id);
                db.collection("projects").doc(projectID).update({
                        "Sprints": "started"
                    })
                    .then(() => {
                        startSprint.reset();
                        window.location.href = "dragDrop.html";
                    });
            })
            .catch((error) => {
                alert("an error occured", error);
            });
            console.log("chose to continue");
        });
    }
    else {
        
        console.log("correct date");
        db.collection("projects").doc(projectID).collection("sprints").add({
            name: sprintName,
            start: startDate,
            pointTotal: 0,
            end: endDate
        })
        .then((doc) => {
            localStorage.setItem("currentSprintID", doc.id);
            db.collection("projects").doc(projectID).update({
                    "Sprints": "started"
                })
                .then(() => {
                    startSprint.reset();
                    window.location.href = "dragDrop.html";
                });
        })
        .catch((error) => {
            alert("an error occured", error);
        });
    }



    

});
