class Player {
  constructor(parentSelector, audio, audioSource, playBtn, timeLine, curTime, fullTime) {
    this.parent = parentSelector;
    this.audio = audio;
    this.audioSource = audioSource;
    this.playBtn = playBtn;
    this.timeLine = timeLine;
    this.curTime = curTime;
    this.fullTime = fullTime;
    this.isPlaying = false;
    this.setTimeLineMax();
    this.playMusic();
    this.timeUpdate();
    this.userTimeMoving();
    this.setSource();
    this.songsCounter = 1;
  }

  setSource() {
    this.audio.src = this.audioSource[0];
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
        if (this.audioSource.length > 1) {
          this.audio.src = this.audioSource[this.songsCounter];
          this.playBtn.classList.toggle('player__btn-play--pause');
          // this.audio.addEventListener('loadedmetadata', () => {
            this.fullTime.innerHTML = `${Math.round(this.timeLine.max / 60)}:${Math.round(this.timeLine.max % 60)}`;
            this.audio.play();
          // });
          this.songsCounter++;
        }
      }
    });
  }
}

const heroPlayer = new Player(
  document.querySelector('.hero__audio-container'),
  document.querySelector('.hero__audio'),
  ['audio/war for love.mp3'],
  document.querySelector('.hero__btn-play'),
  document.querySelector('.hero__cur-time-line'),
  document.querySelector('.hero__play-time'),
  document.querySelector('.hero__full-time')
);

const tracksPlayer = new Player(
  document.querySelector('.tracks__audio-container'),
  document.querySelector('.tracks__audio'),
  ['audio/3Lau Feat. Bright Lights  -  How You Love Me.mp3',
    'audio/war for love.mp3',
    'audio/Benny Benassi & Pink Is Punk feat. Bright Lights - Ghost (Razihel Remix).mp3',
    'audio/Hardwell &amp; Dyro feat. Bright Lights — Never Say Goodbye (Radio Edit).mp3',
    'audio/zeds_dead_and_dirtyphonics-where_are_you_now_feat_bright_lights.mp3',
    'audio/Zedd, Bright Lightsm - Follow You Down (Original Mix).mp3'],
  document.querySelector('.tracks__btn-play'),
  document.querySelector('.tracks__cur-time-line'),
  document.querySelector('.tracks__play-time'),
  document.querySelector('.tracks__full-time')
);
