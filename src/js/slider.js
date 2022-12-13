const slider = document.querySelector('.tours__track');
const sliderList = document.querySelector('.tours__list');
const slideWidth = document.querySelector('.tours__card').clientWidth;
const slides = document.querySelectorAll('.tours__card');
const sliderLeft = document.querySelector('.tours__button--prev');
const sliderRight = document.querySelector('.tours__button--forward');
let index = 0;
let position = slides[0].getBoundingClientRect().left;
const startingTransform = (ww - slideWidth) / 2 - 20;

console.log(startingTransform);

if (ww < 900) {
    slides[index].style.opacity = '1';
    sliderList.style.transform = `translateX(${startingTransform}px)`;
    window.addEventListener('resize', () => {
      sliderList.style.transform = `translateX(${startingTransform}px)`;
    });
}

sliderLeft.addEventListener('click', () => {
    if (index !== 1) {
        console.log('HE 1!');
        sliderList.style.transform = `translateX(-${(slideWidth + 30) * (index - 1) - startingTransform}px)`;
    } else {
        console.log('1!');
        sliderList.style.transform = `translateX(${startingTransform}px)`;
    }
    slides[index-1].style.opacity = '1';
    slides[index].style.opacity = '0';
    sliderRight.classList.remove('tours__button--disabled');
    index--;
    if (index === 0) {
        sliderLeft.classList.add('tours__button--disabled');
    }
    console.log(index);
});

sliderRight.addEventListener('click', () => {
    sliderList.style.transform = `translateX(-${(slideWidth + 30) * (index + 1) - startingTransform}px)`;
    slides[index+1].style.opacity = '1';
    slides[index].style.opacity = '0';
    sliderLeft.classList.remove('tours__button--disabled');
    index++;
    if (index >= slides.length - 1) {
        sliderRight.classList.add('tours__button--disabled');
    }
    console.log(index);
});
