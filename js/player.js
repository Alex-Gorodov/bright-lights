class Player{constructor(e,i,t,a,s,l){this.parent=e,this.audio=i,this.playBtn=t,this.timeLine=a,this.curTime=s,this.fullTime=l,this.isPlaying=!1,this.setTimeLineMax(),this.playMusic(),this.timeUpdate(),this.curTimeUpdate()}setTimeLineMax(){this.audio.addEventListener("loadedmetadata",(()=>{this.timeLine.max=Math.floor(this.audio.duration)}))}playMusic(){this.playBtn.addEventListener("click",(()=>{this.isPlaying?(this.audio.pause(),this.isPlaying=!1,this.playBtn.ariaLabel="play",this.playBtn.classList.remove("player__btn-play--pause")):(this.audio.play(),this.isPlaying=!0,this.playBtn.classList.add("player__btn-play--pause"),this.playBtn.ariaLabel="pause")}))}curTimeUpdate(){this.timeLine.addEventListener("change",(()=>{this.audio.pause(),this.audio.currentTime=this.timeLine.value,this.audio.play()}))}timeUpdate(){this.audio.addEventListener("timeupdate",(()=>{var e=this.audio.currentTime,i=Math.floor(e/3600),t=Math.floor((e-3600*i)/60),a=Math.round(e-3600*i-60*t);0!=a&&a%60==0&&(a=0,t++),i<10&&(i="0"+i),t<10&&(t="0"+t),a<10&&(a="0"+a),this.curTime.innerText=t+":"+a,this.isPlaying&&(this.timeLine.value=this.audio.currentTime),e>=this.timeLine.max&&(this.audio.pause(),this.playBtn.classList.remove("player__btn-play--pause"),this.curTime.innerHTML="00:00",this.timeLine.value=0)}))}}const heroPlayer=new Player(document.querySelector(".player"),document.querySelector(".player__song"),document.querySelector(".player__btn-play"),document.querySelector(".player__cur-time-line"),document.querySelector(".player__play-time"),document.querySelector(".player__full-time"));console.log(heroPlayer);