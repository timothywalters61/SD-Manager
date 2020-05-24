//populate sidenav

const sideNav = document.querySelector('#slide-out');

const setUpSideNav = (data) => {
    let html = '';
    const li = `
    <li><div id = "user-info" class="user-view">
    <div class="background">
      <img src="resources/images/world.jpg">
    </div>
    <a href="#user"><img class="circle" src="resources/images/world.jpg"></a>
    <a href="#name"><span class="white-text name">${data[0]}</span></a>
    <a href="#email"><span class="white-text email">${data[1]}</span></a>
  </div></li>
    `;
    html = html + li;
    sideNav.innerHTML = html;
}
