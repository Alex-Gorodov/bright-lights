const navToggle=document.querySelector(".navigation__toggle"),nav=document.querySelector(".navigation__list");navToggle.addEventListener("click",(function(){nav.classList.toggle("navigation__list--opened")})),window.addEventListener("load",(function(){const e=this.document.querySelector(".equaliser");setTimeout((()=>{e.style.transform="scale(1000)",e.style.opacity="0",setTimeout((()=>{e.remove()}),2e3)}),600)}));