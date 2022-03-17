import Easing from './modules/Easing.js'


window.addEventListener('DOMContentLoaded', function(){
  console.log("DOM fully loaded and parsed");

})

window.addEventListener('load', function(){
  console.log("All resources finished loading!");

  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green';
  ctx.fillRect(10, 10, 100, 100);
  
  let current = 0
  let duration = 1000 
  let range = [1, 1.2]
  
  let startTime = null
  let timeElapsed = 0

  //
  let t1 = document.getElementById('revue-img')
  let r1 = t1 && t1.getBoundingClientRect();
//  console.log(rect.top, rect.right, rect.bottom, rect.left);
  
  
  function isVisible(r1, r2){
//    console.log(rect, scroller.y + window.innerHeight >= rect.top && scroller.y <= rect.bottom)
   // return scroller.y + window.innerHeight >= rect.top && scroller.y <= rect.bottom
  }

  function animate(target, currentTime){
    if(startTime === null){
      startTime = currentTime
    }
    
    timeElapsed = currentTime - startTime
//    timeElapsed = timeElapsed - (timeElapsed % (1000 / 60))
    
    
    if(timeElapsed < duration){
      let e = Easing['easeInOutSine'](timeElapsed, range[0], range[1] - range[0], duration)
      target.style.transform = `scale(${e})` 
    }
      
  }

  
  function watch(){      
    // if(isVisible(r1)){
    //   console.log('t1 visible')
    //   animate(t1, performance.now())
    // }else if(isVisible(r2)){
    //   console.log('t2 visible')
    //   animate(t2, performance.now())
    // } else {
    //   startTime = null      
    // }
      
    requestAnimationFrame(watch)
  }
  
  requestAnimationFrame(watch)

})