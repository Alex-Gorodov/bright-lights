// Burger button
const navToggle = document.querySelector('.navigation__toggle');
const nav = document.querySelector('.navigation__list');
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.page__bg');
const aboutImg = document.querySelector('.about__images-wrapper');

navToggle.addEventListener('click', function() {
  nav.classList.toggle('navigation__list--opened');
});

// Preloader
window.addEventListener('load', function() {
  const eq = this.document.querySelector('.equaliser');
  setTimeout(() => {
    eq.style.transform = 'scale(1000)';
    eq.style.opacity = '0';
    setTimeout(() => {
      eq.remove();
    }, 1000);
  }, 600);
});

window.onscroll = function() {
  if(hero.getBoundingClientRect().top <= 200){
    heroBg.classList.add('page__bg--darken');
  } else {
    heroBg.classList.remove('page__bg--darken');
  }
};
