var btn1 =document.querySelector('.button1');
var modalbg = document.querySelector('.modal-bg');



btn1.addEventListener('click',function(){
    modalbg.classList.add('bg-active');
});

function getAreaValue(){
    var inputVal = document.getElementById("description").value;

    var selector = document.getElementById("progress");
    var strUser = selector.options[selector.selectedIndex].value;

    var subject = document.getElementById("subject").value;

    var date = document.getElementById("duedate").value;

    console.log(date);
    console.log(subject);
    console.log(strUser);
    console.log(inputVal);

}