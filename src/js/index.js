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
let curTimeLine = document.querySelector('.hero__cur-time-line');
let fullTime = document.querySelector('.hero__time-full');
let isPlaying = false;

releazed.onloadedmetadata = function() {
  curTimeLine.max = releazed.duration;
  };

releazed.ontimeupdate = function() {
  var sec_num = releazed.currentTime;
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (seconds == 58) {
    seconds = 0;
    minutes++;
  }
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
  if (isPlaying) {
    curTimeLine.value=releazed.currentTime;
  }
};

curTimeLine.onchange=function() {
  releazed.pause();
  releazed.currentTime = curTimeLine.value;
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
