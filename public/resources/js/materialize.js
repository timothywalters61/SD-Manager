document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav);
});