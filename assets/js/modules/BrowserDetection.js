export {BrowserDetection as default} 

class BrowserDetection{
  
  constructor(minVersions){
    
    //The minimum supported browser version 
    this.minVersions = Object.assign({
      chrome: 58, 
      edge: 14,
      firefox: 54,
      safari: 10,
      opera: 55
    }, minVersions)
    
    //Array(name, version)
    this.navigator
    
    var ua = navigator.userAgent, 
        tem, 
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    this.navigator = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if(/trident/i.test(M[1])){
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      this.navigator = ['ie', (tem[1] || '')];
    }
    
    if(M[1] === 'Chrome'){
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem != null) this.navigator = [tem[1], tem[2].replace('OPR', 'Opera')];
    }
    
    if((tem = ua.match(/version\/(\d+)/i))!= null) {
      this.navigator.splice(1, 1, tem[1]);
      this.navigator = M;
    }
  }
  
  isSupported(){
    console.log(this.minVersions, this.navigator)
    
    return !!this.minVersions[this.navigator[0].toLowerCase()] && 
            this.navigator[1] >= this.minVersions[this.navigator[0].toLowerCase()];
  }
}