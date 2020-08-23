"use strict";

//populate project dropdown
var projectBox = document.querySelector("#projectContainer");

var setUpProjects = function setUpProjects(data) {
  var html = '';
  data.forEach(function (doc) {
    var project = doc.data();
    var projectName = project.name;
    var docID = doc.id;
    /**
     *
     * I used the docID as the id of the div
     * this makes it possible to know which project
     * is to be deleted. when you press a project, an alert will popup
     */

    var li = "\n            <div id='".concat(docID, "' class=\"project-box\">\n            <a href=\"#\" onclick=\"saveDocID('").concat(docID, "', '").concat(project.OwnerID, "', '").concat(projectName, "')\"></a><span>").concat(projectName, "</span>\n            </div>\n        ");
    html = html + li;
  });
  projectBox.innerHTML = html;
};

var saveDocID = function saveDocID(data, data1, data2) {
  //I'M NEW
  //opens alert dialog
  //you can learn more about the alert dialog here, https://sweetalert.js.org/
  swal({
    text: "What do you want to do with this project",
    //icon: "info",
    buttons: {
      //declaring the buttons in the alert dialog
      cancel: true,
      deleteProject: {
        text: "delete Project",
        value: "delete",
        dangerMode: true
      },
      openProject: {
        text: "Open Project",
        value: "open"
      }
    },
    closeOnClickOutside: true
  }).then(function (selectedOption) {
    switch (selectedOption) {
      //check which button was pressed
      case "open":
        var user = auth.currentUser;
        localStorage.setItem("docID", data);
        localStorage.setItem("ownerID", data1);
        localStorage.setItem("docName", data2);

        if (data1 === user.uid) {
          window.location.href = "projectOwner.html";
        } else {
          window.location.href = "projectDeveloper.html";
        }

        break;

      case "delete":
        //TODO: send project id (data) so that it gets deleted, then after getting response, you can then remove project from the fontend
        //below is the code that removes the project on front-end
        var project = document.getElementById(data);
        project.remove();
        swal({
          text: "Project deleted",
          icon: "success"
        });
        break;
    }
  }); //console.log(localStorage.getItem("docID"));
};