(function () {
  'use strict';

  window.Copper={};

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Easing = /*#__PURE__*/_createClass(function Easing() {
    _classCallCheck(this, Easing);
  });

  Easing.linear = function (t, b, c, d) {
    return c * t / d + b;
  };

  Easing.easeInQuad = function (t, b, c, d) {
    t /= d;
    return c * t * t + b;
  };

  Easing.easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  };

  Easing.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  Easing.easeInCubic = function (t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
  };

  Easing.easeOutCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  };

  Easing.easeInOutCubic = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };

  Easing.easeInQuart = function (t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
  };

  Easing.easeOutQuart = function (t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  };

  Easing.easeInOutQuart = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  };

  Easing.easeInQuint = function (t, b, c, d) {
    t /= d;
    return c * t * t * t * t * t + b;
  };

  Easing.easeOutQuint = function (t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  };

  Easing.easeInOutQuint = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t * t * t + 2) + b;
  };

  Easing.easeInSine = function (t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  };

  Easing.easeOutSine = function (t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  };

  Easing.easeInOutSine = function (t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  };

  Easing.easeInExpo = function (t, b, c, d) {
    return c * Math.pow(2, 10 * (t / d - 1)) + b;
  };

  Easing.easeOutExpo = function (t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
  };

  Easing.easeInOutExpo = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
  };

  Easing.easeInCirc = function (t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - t * t) - 1) + b;
  };

  Easing.easeOutCirc = function (t, b, c, d) {
    t /= d;
    t--;
    return c * Math.sqrt(1 - t * t) + b;
  };

  Easing.easeInOutCirc = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    t -= 2;
    return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
  };

  window.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");
  });
  window.addEventListener('load', function () {
    console.log("All resources finished loading!");
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);

    var t1 = document.getElementById('revue-img');
    var r1 = t1 && t1.getBoundingClientRect(); //  console.log(rect.top, rect.right, rect.bottom, rect.left);

    function watch() {
      // if(isVisible(r1)){
      //   console.log('t1 visible')
      //   animate(t1, performance.now())
      // }else if(isVisible(r2)){
      //   console.log('t2 visible')
      //   animate(t2, performance.now())
      // } else {
      //   startTime = null      
      // }
      requestAnimationFrame(watch);
    }

    requestAnimationFrame(watch);
  });

}());
