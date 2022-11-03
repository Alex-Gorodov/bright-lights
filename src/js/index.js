// Burger button
const navToggle = document.querySelector('.navigation__toggle');
const nav = document.querySelector('.navigation__list');

navToggle.addEventListener('click', function() {
  nav.classList.toggle('navigation__list--opened');
});

// Audio
let releazed = document.querySelector('.hero__audio');
let playTime = document.querySelector('.hero__play-time');
let playBtn = document.querySelector('.hero__btn-play');
let curTime = document.querySelector('.hero__cur-time');
let fullTime = document.querySelector('.hero__time-full');
let isPlaying = false;

releazed.onloadedmetadata = function() {
  curTime.max = releazed.duration;
  };

releazed.ontimeupdate = function() {
  var sec_num = releazed.currentTime;
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  seconds = Math.round(seconds);

  if (hours < 10) {
    hours = "0"+hours;
  }
  if (minutes < 10) {
    minutes = "0"+minutes;
  }
  if (seconds < 10) {
    seconds = "0"+seconds;
  } playTime.innerHTML = minutes+':'+seconds;
};

curTime.onchange=function() {
  releazed.pause();
  releazed.currentTime = curTime.value;
  releazed.play();
};

playBtn.addEventListener("click", (a) => {
  if(isPlaying) {
    releazed.pause();
    isPlaying = false;
    playBtn.ariaLabel = 'play';
  } else {
    releazed.play();
    isPlaying = true;
    playBtn.ariaLabel = 'pause';
  }
});
