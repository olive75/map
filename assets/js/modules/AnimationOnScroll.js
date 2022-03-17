import Easing from './Easing.js'

export {AnimationOnScroll as default}
        
class AnimationOnScroll{
  
  constructor(options){
    this.target = options.target
//    this.scroller = scroller
    this.options = Object.assign({}, {
      easing : 'linear'
    }, options || {})
    this.animations = Object.keys(this.options).filter(value => -1 !== ['translateX', 'translateY', 'rotate', 'scale'].indexOf(value))
//    this.properties = {
//      cssTransforms: Object.keys(this.options).filter(value => -1 !== ['translateX', 'translateY', 'rotate', 'scale'].indexOf(value)),
//      cssProperties: Object.keys(this.options).filter(value => -1 !== ['opacity'].indexOf(value))
//    }
    this.rect = this.target.getBoundingClientRect()
    this.startTime = null
  }
        
  isVisible(){
    return this.scroller.y + window.innerHeight >= this.rect.top && this.scroller.y <= this.rect.bottom
  }
        
  animate(currentTime){
    if(this.startTime === null){
      this.startTime = currentTime
    }
    
    this.timeElapsed = currentTime - this.startTime
//    timeElapsed = timeElapsed - (timeElapsed % (1000 / 60))
    
    
    if(this.timeElapsed < this.options.duration){
      let e = Easing[this.options.easing](timeElapsed, this.animations[0], this.animations[1] - this.animations[0], this.options.duration)
      target.style.transform = `scale(${e})` 
    }
      
  }
}