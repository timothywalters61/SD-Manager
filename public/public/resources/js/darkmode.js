
    var val = localStorage.getItem("value");
    console.log(val);
    var count;

    if(val === "dark") {
        document.documentElement.classList.toggle('dark-mode');
        document.body.style.backgroundImage = "url('resources/images/white2.jpg')";
        count=1;
    }
    else {
        count=0;
    }
    console.log(count);
function darkmode() {
    // e=e||window.event;
    // if(e.keyCode===13) {
        document.documentElement.classList.toggle('dark-mode');
        count++;


        document.querySelectorAll('.original').forEach((result) => {
          result.classList.toggle('natural');
        })

        if(count % 2 != 0){
            localStorage.setItem("value", "dark");
            document.body.style.backgroundImage = "url('resources/images/white2.jpg')";
        }
        else {
            localStorage.setItem("value", "light");
            document.body.style.backgroundImage = "url('resources/images/image.jpg')";
        }
        console.log(count);
        console.log(localStorage.getItem("value"));

    // }
}