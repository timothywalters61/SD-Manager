//setup user interaction with buttons on home page

const sideNav = document.querySelector('#slide-out');

const setUpSideNav = (data) => {
    let html = '';
    const li = `
    <li><div id = "user-info" class="user-view">
    <div class="background">
      <img src="pictures/Russia.jpg">
    </div>
    <a href="#user"><img class="circle" src="pictures/Russia.jpg"></a>
    <a href="#name"><span class="white-text name">${data[0]}</span></a>
    <a href="#email"><span class="white-text email">${data[1]}</span></a>
  </div></li>
  <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
  <li><a href="#!">Second Link</a></li>
  <li><div class="divider"></div></li>
  <li><a class="subheader">Subheader</a></li>
  <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    `;
    html = html + li;
    sideNav.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);

    var sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav);

    var dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown);
});
