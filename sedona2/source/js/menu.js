let menuButton = document.querySelector('.page-header__menu-button');
let menu = document.querySelector('.page-header__menu');

menuButton.addEventListener('click', function() {
  if (menu.classList.contains('page-header__menu--open')) {
    menu.classList.remove('page-header__menu--open');
    menuButton.classList.remove('page-header__menu-button--close');
  } else {
    menu.classList.add('page-header__menu--open');
    menuButton.classList.add('page-header__menu-button--close');
  }
});
