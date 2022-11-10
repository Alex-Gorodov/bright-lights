class Player {
  constructor(parentSelector, audio, playBtn, timeLine, curTime, fullTime) {
    this.parent = parentSelector;
    this.audio = Array.from(audio);
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
    for (const song of this.audio) {
      song.addEventListener('loadedmetadata', () => {
        this.timeLine.max = Math.floor(song.duration);
      });
    }
  }

  playMusic() {
    this.playBtn.addEventListener('click', () => {
      this.playBtn.classList.toggle('player__btn-play--pause');
      for (const song of this.audio) {
        if(this.isPlaying) {
          song.pause();
          this.isPlaying = false;
          this.playBtn.ariaLabel = 'play';
        } else {
          song.play();
          this.isPlaying = true;
          this.playBtn.ariaLabel = 'pause';
        }
      }
    });
  }

  userTimeMoving() {
    this.timeLine.addEventListener('change', () => {
      for (const song of this.audio) {
        song.currentTime = this.timeLine.value;
      }
    });
  }

  timeUpdate() {
    for (const song of this.audio) {
      song.addEventListener('timeupdate',() => {
        var sec_num = song.currentTime;
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
          this.timeLine.value = song.currentTime;
        }
        if (sec_num >= this.timeLine.max) {
          song.pause();
          this.playBtn.classList.remove('player__btn-play--pause');
          this.curTime.innerHTML = '00:00';
          this.timeLine.value = 0;
        }
      });
    }
  }

  // ADD here method for playing next song from an array of songs and stop when the last song played
}

const heroPlayer = new Player(
  document.querySelector('.hero__audio-container'),
  document.querySelectorAll('.hero__audio'),
  document.querySelector('.hero__btn-play'),
  document.querySelector('.hero__cur-time-line'),
  document.querySelector('.hero__play-time'),
  document.querySelector('.hero__full-time')
);
