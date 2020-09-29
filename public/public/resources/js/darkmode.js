document.onkeypress = function (e) {
    e=e||window.event;
    if(e.keyCode===13) {
        document.documentElement.classList.toggle('dark-mode');
    }
}