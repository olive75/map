import * as Utils from './Utils.js';

export {Scroller as default}

// Reasonable defaults
var PIXEL_STEP  = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

function normalizeWheel(/*object*/ event) /*object*/ {
  var sX = 0, sY = 0,       // spinX, spinY
      pX = 0, pY = 0;       // pixelX, pixelY

  // Legacy
  if ('detail'      in event) { sY = event.detail; }
  if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) { pY = event.deltaY; }
  if ('deltaX' in event) { pX = event.deltaX; }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {          // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {                             // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  return { spinX  : sX,
           spinY  : sY,
           pixelX : pX,
           pixelY : pY };
}
        
class Scroller{
  
  constructor(options){
    this.target = document.querySelector(options.target)
    this.options = Object.assign({}, {
      coef: 0.09,
      fixed: {
        target: null,
        translateY: [0, 0]
      },
      parallax: [{
        target: null,
        translateY: [],
        coef: 0
      }]
    }, options || {})
    
//    window.scrollTo(0,0)
    
    this.y = 0
    this.current = 0
    
    this.minY = 0
    this.maxY = this.setMaxY()
    
    //Events
    window.addEventListener('wheel', this.onWheel.bind(this))
    window.addEventListener('resize', Utils.debounce(this.onResize.bind(this), 300))
    
    //plugins
    this.plugins = [new ScrollerLocation(this, '#scroller-location')]
    
    return this
  }
  
  onWheel(e){
    /* Needed to get correct wheel event deltaY value:
     * body{ overflow: hidden; }
     * or 
     * e.preventDefault()
     */
    e.preventDefault()
    
    this.y += parseInt(e.deltaY)

    if(this.y >= this.maxY)
      this.y = this.maxY

    if(this.y < this.minY)
      this.y = this.minY
  }
  
  onResize(e){
    this.maxY = this.setMaxY()

    if(this.y > this.maxY)
      this.y = this.maxY

    console.log('resize', Date.now())
  }
  
  setMaxY(){
    let body = document.body,
        html = document.documentElement;
      
    return - window.innerHeight + Math.max(
      this.target.offsetHeight,
      this.target.scrollHeight,
      body.scrollHeight, 
      body.offsetHeight, 
      html.clientHeight, 
      html.scrollHeight, 
      html.offsetHeight)
  }
  
  animate(){
    if(Math.abs(this.current - this.y) > 0.01)
      this.current += (this.y - this.current) * this.options.coef
    else
      this.current = this.y
    
    this.target.style.transform = `translate3d(0, -${this.current}px, 0)`
    
    //Parallax effect
    for(let i=0; i<this.options.parallax.length; i++){
      if(this.current >= this.options.parallax[i].translateY[0] && this.current <= this.options.parallax[i].translateY[1]){
        let parallax = -this.current * this.options.parallax[i].coef
        this.options.parallax[i].target.style.transform = `translate3d(0, ${parallax}px, 0)`
      }
    }
        
    //Animate plugins
    for(let i=0; i<this.plugins.length; i++){
      this.plugins[i].animate()
    }
    
//    if(this.y !== this.current)
//      console.log(this.minY, this.y, this.current, this.maxY)
    
    requestAnimationFrame(this.animate.bind(this))
  }
}

class ScrollerLocation{
  
  constructor(scroller, target){
    this.scroller = scroller
    this.target = document.querySelector(target)
    this.width = window.innerWidth
  }
  
  animate(currentTime){
    let ratio = 100 - 100 * (this.scroller.current / this.scroller.maxY)
    this.target.style.transform = `translate3d(-${ratio}%, 0, 0)`
  }
}