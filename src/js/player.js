let players = [];

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
    this.clickOnSong();
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
      for (let i = 0; i < players.length; i++) {
        players[i].audio.pause();
        if (players[i].playBtn.classList.contains('player__btn-play--pause')) {
          players[i].playBtn.classList.toggle('player__btn-play--pause');
        }
        players[i].isPlaying = false;
        players[i].playBtn.ariaLabel = 'play';
      }
      this.playBtn.classList.toggle('player__btn-play--pause');
      if(this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.playBtn.ariaLabel = 'play';
      } else {
        this.isPlaying = true;
        let tracks = Array.from(document.querySelectorAll('.tracks__item'));
        tracks[0].classList.add('tracks__track-item--active');
        for (let i = 0; i < tracks.length; i++) {
          if (i != 0 && tracks[i].classList.contains('tracks__track-item--active')) {
            tracks[0].classList.remove('tracks__track-item--active');
            this.audio.play();
          }
        }
        this.audio.play();
        this.playBtn.ariaLabel = 'pause';
      }
    });
  }

  clickOnSong() {
    let tracks = Array.from(document.querySelectorAll('.tracks__item'));
    if (this.audioSource.length > 1) {
      for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks.length; j++) {
          tracks[i].addEventListener('click', () => {
            for (let i = 0; i < players.length; i++) {
              players[i].audio.pause();
              if (players[i].playBtn.classList.contains('player__btn-play--pause')) {
                players[i].playBtn.classList.toggle('player__btn-play--pause');
              }
            }
            tracks[j].classList.remove('tracks__track-item--active');
            tracks[i].classList.add('tracks__track-item--active');
            this.audio.src = this.audioSource[i];
            this.audio.addEventListener('loadedmetadata', () => {
              this.fullTime.innerHTML = `${Math.floor(this.audio.duration / 60)}:${Math.floor(this.audio.duration % 60)}`;
              this.audio.play();
            });
            this.playBtn.classList.add('player__btn-play--pause');
            this.playBtn.ariaLabel = 'play';
            this.isPlaying = true;
            this.songsCounter = i + 1;
          });
        }
      }
    }
  }

  userTimeMoving() {
    this.timeLine.addEventListener('change', () => {
      this.audio.currentTime = this.timeLine.value;
      this.timeLine.style.backgroundSize = `${(this.timeLine.value - this.timeLine.min) * 100 / (this.timeLine.max - this.timeLine.min)}% 100%`;
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
          this.audio.addEventListener('loadedmetadata', () => {
            this.fullTime.innerHTML = `${Math.floor(this.audio.duration / 60)}:${Math.floor(this.audio.duration % 60)}`;
            this.audio.play();
          });
          let tracks = Array.from(document.querySelectorAll('.tracks__item'));
          for (let i = 0; i < tracks.length; i++) {
            tracks[i].addEventListener('click', () => {
              tracks[i].classList.add('tracks__track-item--active');
              this.setSource();
              this.audio.play();
            });
          }
          if (this.songsCounter < tracks.length) {
            tracks[this.songsCounter].classList.add('tracks__track-item--active');
          }
          tracks[this.songsCounter - 1].classList.remove('tracks__track-item--active');
          this.songsCounter++;
          if (this.songsCounter === this.audioSource.length + 1) {
            tracks[this.songsCounter - 2].classList.remove('tracks__track-item--active');
            this.playBtn.classList.remove('player__btn-play--pause');
            this.audio.pause();
            this.songsCounter = 1;
          }
        }
      }
      this.timeLine.style.backgroundSize = `${(this.timeLine.value - this.timeLine.min) * 100 / (this.timeLine.max - this.timeLine.min)}% 100%`;
    });
  }
}

const heroPlayer = new Player(
  document.querySelector('.hero__audio-container'),
  document.querySelector('.hero__audio'),
  ['audio/song-2.mp3'],
  document.querySelector('.hero__btn-play'),
  document.querySelector('.hero__cur-time-line'),
  document.querySelector('.hero__play-time'),
  document.querySelector('.hero__full-time')
);

const tracksPlayer = new Player(
  document.querySelector('.tracks__audio-container'),
  document.querySelector('.tracks__audio'),
  ['audio/song-1.mp3',
    'audio/song-2.mp3',
    'audio/song-3.mp3',
    'audio/song-4.mp3',
    'audio/song-5.mp3',
    'audio/song-6.mp3'],
  document.querySelector('.tracks__btn-play'),
  document.querySelector('.tracks__cur-time-line'),
  document.querySelector('.tracks__play-time'),
  document.querySelector('.tracks__full-time')
);

players.push(heroPlayer, tracksPlayer);
console.log(players.length);
