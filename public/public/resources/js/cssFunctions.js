function toast(data) {
    // Get the snackbar DIV
    var x = document.getElementById("toast");
  
    let html=`${data}`;
    x.innerHTML = html;

    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  function toastError(data) {
    // Get the snackbar DIV
    var x = document.getElementById("toast-error");
  
    let html=`${data}`;
    x.innerHTML = html;

    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  function showCreateForm(){
    var x = document.getElementById("createProjectForm");

    x.className = "show login-box";
  }

  function hideCreateForm(){
    var x = document.getElementById("createProjectForm");
    x.className = "hide";
  }

  function showAddForm(){
    var x = document.getElementById("modal");
    x.className = "show login-box";
  }

  function hideAddForm(){
    var x = document.getElementById("modal");
    x.className = "hide";
  }

  function showSprintForm(){
    var x = document.getElementById("createSprint");
    x.className = "show login-box";
  }
  
  function hideSprintForm(){
    var x = document.getElementById("createSprint");
    x.className = "hide";
  }

  function showSprintdateForm(){
    var x = document.getElementById("sprintDate");
    x.className = "show login-box";
  }
  
  function hideSprintdateForm(){
    var x = document.getElementById("sprintDate");
    x.className = "hide";
  }

  function showSprintdateSwapForm(){
    var x = document.getElementById("sprintDateSwap");
    x.className = "show login-box";
  }
  
  function hideSprintdateSwapForm(){
    var x = document.getElementById("sprintDateSwap");
    x.className = "hide";
  }

  function showUserStoryForm(){
    var x = document.getElementById("createUserStory");
    x.className = "show login-box";
  }

  function showFullUserStoryForm() {
    var x = document.getElementById("ViewUserStory");
    x.className = "show login-box";
    x.style.display = "block";
    let y = document.getElementById("userStory-form2");
    y.style.visibility = "visible";
    console.log("in");
  }

function hideFullUserStoryForm(){
  var x = document.getElementById("ViewUserStory");
  x.className = "hide";
  x.style.display = "none";
  let y = document.getElementById("userStory-form2");
  y.style.visibility = "hidden";
}

  function hideUserStoryForm(){
    var x = document.getElementById("createUserStory");
    x.className = "hide";
  }

  function hideTaskForm(){
    var x = document.getElementById("createTask");
    x.className = "hide";
  }

  function showTaskForm(){
    var x = document.getElementById("createTask");
    x.className = "show login-box";
  }