class Player {
  constructor(parentSelector, audio, playBtn, timeLine, curTime, fullTime) {
    this.parent = parentSelector;
    this.audio = audio;
    this.playBtn = playBtn;
    this.timeLine = timeLine;
    this.curTime = curTime;
    this.fullTime = fullTime;
    this.isPlaying = false;
    this.setTimeLineMax();
    this.playMusic();
    this.timeUpdate();
    this.userTimeMoving();
  }

  setTimeLineMax() {
    this.audio.addEventListener('loadedmetadata', () => {
      this.timeLine.max = Math.floor(this.audio.duration);
    });
  }

  playMusic() {
    this.playBtn.addEventListener('click', () => {
      this.playBtn.classList.toggle('player__btn-play--pause');
      if(this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.ariaLabel = 'play';
      } else {
        this.audio.play();
        this.isPlaying = true;
        this.playBtn.ariaLabel = 'pause';
      }
    });
  }

  userTimeMoving() {
    this.timeLine.addEventListener('change', () => {
      this.audio.currentTime = this.timeLine.value;
    });
  }

  timeUpdate() {
    this.audio.addEventListener('timeupdate',() => {
      var sec_num = this.audio.currentTime;
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = Math.round(sec_num - (hours * 3600) - (minutes * 60));
      if (seconds != 0 && seconds % 60 == 0) {
        seconds = 0;
        minutes++;
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      this.curTime.innerText = minutes + ':' + seconds;
      if (this.isPlaying) {
        this.timeLine.value = this.audio.currentTime;
      }
      if (sec_num >= this.timeLine.max) {
        this.audio.pause();
        this.playBtn.classList.remove('player__btn-play--pause');
        this.curTime.innerHTML = '00:00';
        this.timeLine.value = 0;
      }
    });
  }
}

const heroPlayer = new Player(
  document.querySelector('.hero__audio-container'),
  document.querySelector('.hero__audio'),
  document.querySelector('.hero__btn-play'),
  document.querySelector('.hero__cur-time-line'),
  document.querySelector('.hero__play-time'),
  document.querySelector('.hero__full-time')
);
