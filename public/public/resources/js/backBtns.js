function backProjects(){
    window.location.href = "userHome.html";
}

function back(){
    console.log("in back()");
    const prev = localStorage.getItem("prevPage");
    window.location.href = prev;

}

function save(page){
    localStorage.setItem("prevPage", page);

}
