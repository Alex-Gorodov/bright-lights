// Burger button
const navToggle = document.querySelector('.navigation__toggle');
const nav = document.querySelector('.navigation__list');

navToggle.addEventListener('click', function() {
  nav.classList.toggle('navigation__list--opened');
});

// Preloader
window.addEventListener('load', function() {
  const eq = this.document.querySelector('.equaliser');
  setTimeout(() => {
    eq.style.transform = 'scale(100)';
    eq.style.opacity = '0';
    setTimeout(() => {
      eq.remove();
    }, 1000);
  }, 600);
});
