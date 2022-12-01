let ww = window.innerWidth;
let gw = document.querySelector('.gallery__list').scrollWidth;


if (ww < 1150) {
  const galleryRunning = document.querySelector('.gallery__list').animate(
    [
      {transform: 'translateX(0)'},
      {transform: `translateX(${ww-gw-40}px)`},
      {transform: 'translateX(0)'}
    ], {
      duration: ww*20,
      iterations: Infinity,
      fill: 'backwards',
      easing: 'cubic-bezier(0.4, 0.5, 0.4, 0.5)',
    });

    const animPause = function() {
      if(galleryRunning.playState === 'running') {
        galleryRunning.pause();
      } else {
        galleryRunning.play();
      }
    }

    document.querySelector('.gallery__list').addEventListener('click', () => {
      animPause();
    });

    document.querySelector('.gallery__list').addEventListener('touch', () => {
      animPause();
    });
}
