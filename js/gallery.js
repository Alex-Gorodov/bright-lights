let ww=window.innerWidth,gw=document.querySelector(".gallery__list").scrollWidth;if(ww<1150){document.querySelector(".gallery__list").animate([{transform:"translateX(0)"},{transform:`translateX(${ww-gw-40}px)`},{transform:"translateX(0)"}],{duration:20*ww,iterations:1/0,fill:"backwards",easing:"cubic-bezier(0.4, 0.5, 0.4, 0.5)"})}console.log(ww);