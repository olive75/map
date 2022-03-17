export {Easing as default} 

class Easing{
  
//        Easing[this.options.easing](timeElapsed, 0, 1, this.duration)
 /**
  * @param {Number} t The time elapsed => from 0 to d
  * @param {Number} b The start value => linear(0, 0, c, d) = b
  * @param {Number} c The slope => c=1 => linear()
  * @param {Number} d The distance or duration
  */
  static linear = function (t, b, c, d) {
	return c*t/d + b;
  };

  static easeInQuad = function (t, b, c, d) {
      t /= d;
      return c*t*t + b;
  };

  static easeOutQuad = function (t, b, c, d) {
      t /= d;
      return -c * t*(t-2) + b;
  };
        
  static easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
  }
        
  static easeInCubic = function (t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
  }
        
  static easeOutCubic = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
  }

  static easeInOutCubic = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
  }
        
  static easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
  }
  
        
  static easeOutQuart = function (t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
  }
        
  static easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
  }
        
  static easeInQuint = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t*t + b;
  }
        
  static easeOutQuint = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
  }
             
  static easeInOutQuint = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
  }
        
  static easeInSine = function (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  }
        
  static easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
  }
        
  static easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  }
        
  static easeInExpo = function (t, b, c, d) {
	return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
  }
        
  static easeOutExpo = function (t, b, c, d) {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
  }
        
  static easeInOutExpo = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
  }
        
  static easeInCirc = function (t, b, c, d) {
	t /= d;
	return -c * (Math.sqrt(1 - t*t) - 1) + b;
  }
        
  static easeOutCirc = function (t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
  }
        
  static easeInOutCirc = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
  }
}