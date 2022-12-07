// Burger button
const navToggle = document.querySelector('.navigation__toggle');
const nav = document.querySelector('.navigation__list');

navToggle.addEventListener('click', function() {
  nav.classList.toggle('navigation__list--opened');
});

window.addEventListener('load', function() {
  setTimeout(() => {
    this.document.querySelector('.equaliser').remove();
  }, 60000);
});
