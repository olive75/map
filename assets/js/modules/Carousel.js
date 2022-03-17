export {Carousel as default}

class CarouselTouchPlugin{
  
  constructor(carousel){
    this.carousel = carousel
    //Bloquer le drag des images
    carousel.element.addEventListener('dragstart', e => e.preventDefault())
    
    carousel.element.addEventListener('mousedown', this.startDrag.bind(this))
    carousel.element.addEventListener('touchstart', this.startDrag.bind(this))
    window.addEventListener('mousemove', this.drag.bind(this))
    window.addEventListener('touchmove', this.drag.bind(this))
    window.addEventListener('touchend', this.endDrag.bind(this))
    window.addEventListener('touchcancel', this.endDrag.bind(this))
    window.addEventListener('mouseup', this.endDrag.bind(this))
  }
  
  /**
   * Démarre le déplacement au touché
   * @param {MouseEvent|TouchEvent} e
   */
  startDrag(e){
    if(e.touches)
      if(e.touches.length > 1)
        return
      else
        e = e.touches[0]
        
    this.origin = {x: e.screenX, y: e.screenY}
    this.width = this.carousel.containerWidth
    this.carousel.disableTransition()
    console.log('start drag')
  }
  
  /**
   * Déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  drag(e){
    if(this.origin){
      let point = e.touches ? e.touches[0] : e
      let translate = {x: point.screenX - this.origin.x, y: point.screenY - this.origin.y}
      
      //Cancel event if the aim is to slide the carousel
      if(e.touches && Math.abs(translate.x) > Math.abs(translate.y)){
        e.preventDefault()
        e.stopPropagation()
      }
        
      let baseTranslate = -100 * this.carousel.currentItem / this.carousel.items.length
      this.lastTranslate = translate
      this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
      console.log(translate)
    }
  }
  
  /**
   * Fin du déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  endDrag(e){
    if(this.origin && this.lastTranslate){
      this.carousel.enableTransition()
      if(Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2)
        if(this.lastTranslate.x < 0)
          this.carousel.next()
        else
          this.carousel.prev()
      else
        this.carousel.goToItem(this.carousel.currentItem)
    }
    this.origin = null
  }
}

class Carousel{
  
  /**
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {Object} [options.slidesToScroll=1]   Number of slides to scroll
   * @param {Object} [options.slidesVisible=1]    Number of slides to display
   * @param {boolean}[options.loop=false]         Doit-on boucler en fin de carousel?
   * @param {boolean}[options.navigation=true]    Naviger?
   * @param {boolean}[options.pagination=false]   Paginer?
   * @param {boolean}[options.infinite=false]     Défilement infini?
   */
  constructor(element, options){
    this.element = element
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      loop: false,
      navigation: true,
      pagination: false,
      infinite: false
    }, options || {})
    
    if(this.options.loop && this.options.infinite)
      throw new Error('Un carousel ne peut être à la fois en boucle est en infini')
    
    this.isMobile = true
    this.currentItem = 0
    this.moveCallbacks = []
    this.offset = 0
    
    /**
     * DOM manipulation 
     */
    this.root = this.createDivWithClass('carousel')
//    this.root.setAttribute('tabindex', '0')
    this.container = this.createDivWithClass('carousel__container')
    
    //[].slice.call create an array from NodeList (pseudo array) this.element.children which is dynamic
    let children = [].slice.call(this.element.children)
    
    this.root.appendChild(this.container)
    this.element.appendChild(this.root)
    
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel__item')
      item.appendChild(child)
      return item
    })
    
    if(this.options.infinite){
      this.offset = this.options.slidesVisible + this.options.slidesToScroll
      
      if(this.items > children.length)
        console.error("Vous n'avez pas assez d'éléments dans le carousel", element)
      
      this.items = [
        //Besoin de cloner les éléments pour les ajouter au tableau
        ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
        ...this.items,
        //Besoin de cloner les éléments pour les ajouter au tableau
        ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)) 
      ]
      this.goToItem(this.offset, false)
    }
    
    this.items.forEach(item => this.container.appendChild(item))
    
    
    this.setStyle()
    
    if(this.options.navigation)
      this.createNavigation()
      
    if(this.options.pagination)
      this.createPagination()
    
    /**
     * Evenements 
     */
    this.onWindowResize()
    
    //Launch moveCallbacks
    this.moveCallbacks.forEach(cb => cb(this.currentItem))
    
    //Launch resize event handler => responsive
    window.addEventListener('resize', this.onWindowResize.bind(this))
    
    //Keyboard navigation
    this.root.addEventListener('keyup', (e) => {
      if(e.key === 'ArrowLeft' || e.key === 'Left')
        this.prev()
      else if (e.key === 'ArrowRight' || e.key === 'Right')
        this.next()
    })
    
    //Move the slides without animation whan necessary
    if(this.options.infinite)
      this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
      
    //Drag & drop plugin
    new CarouselTouchPlugin(this)
  }
  
  /**
   * Applique les bonnes dimension au carousel en % en pas en pixel 
   * si en pixel : il faut ecouter les resize pour màj de la taille en px
   * si en % : le navigateur doit choisir comment rendre les 1/2 px => plus facile et performant
   */
  setStyle(){
    let ratio = this.items.length / this.slidesVisible
    this.container.style.width = ratio * 100 + '%'
    this.items.forEach((item) => {
      item.style.width = (100 / this.slidesVisible) / ratio + '%'
    })
  }
  
  createPagination(){
    let pagination = this.createDivWithClass('carousel__pagination')
    let buttons = []
    this.root.appendChild(pagination)
    for (let i=0; i < this.items.length - 2 * this.offset; i += this.options.slidesToScroll){
      let button = this.createDivWithClass('carousel__pagination__button')
      button.addEventListener('click', () => this.goToItem(i + this.offset))
      pagination.appendChild(button)
      buttons.push(button)
    }
    this.onMove(index => {
      let count = this.items.length - 2 * this.offset
      let activeButton = buttons[Math.floor((index - this.offset) % count / this.options.slidesToScroll)]
      if(activeButton){
        buttons.forEach(button => button.classList.remove('carousel__pagination__button--active'))
        activeButton.classList.add('carousel__pagination__button--active')
      }
    })
  }
  
  createNavigation(){
    let nextButton = this.createDivWithClass('carousel__next') 
    let prevButton = this.createDivWithClass('carousel__prev')
    this.root.appendChild(nextButton)
    this.root.appendChild(prevButton)
    nextButton.addEventListener('click', this.next.bind(this))
    prevButton.addEventListener('click', this.prev.bind(this))
    
    if(this.options.loop === true)
      return
    
    this.onMove(index => {
      //Prev button
      if(index === 0)
        prevButton.classList.add('carousel__prev--hidden')
      else
        prevButton.classList.remove('carousel__prev--hidden')
        
      //Next button
      if(undefined === this.items[this.currentItem + this.slidesVisible])
        nextButton.classList.add('carousel__next--hidden')
      else
        nextButton.classList.remove('carousel__next--hidden')
    })
  }
  
  next(){
    this.goToItem(this.currentItem + this.slidesToScroll)
  }
    
  prev(){
    this.goToItem(this.currentItem - this.slidesToScroll)
  }
    
  /**
   * Déplace le carousel vers l'élément ciblé
   * @param {Number} index  
   */
  goToItem(index, animate){
    animate || (animate = true)
    if(index < 0){
      if(!this.options.loop)
        return
        
      index = this.items.length - this.slidesVisible
    } else if (index >= this.items.length 
             //Ou je vais à droite et il n'y a plus de slide après
             || (index > this.currentItem && undefined === this.items[this.currentItem + this.slidesVisible])){
      if(!this.options.loop)
        return
        
      index = 0
    }
    
    let x = -index * 100 / this.items.length
    if(animate === false)
      this.disableTransition()
      
    this.translate(x)
    this.container.offsetHeight //Force redraw
    
    if(animate === false)
      this.enableTransition() //Reset the transition
    
    this.currentItem = index
    
    //Launch moveCallbacks
    this.moveCallbacks.forEach(cb => cb(index))
  }
  
  translate(percent){
    this.container.style.transform = `translate3d(${percent}%, 0, 0)`
  }
  
  resetInfinite(){
    if(this.currentItem <= this.options.slidesToScroll)
      this.goToItem(this.currentItem + (this.items.length - 2 * this.offset), false)
    else if(this.currentItem >= this.items.length - this.offset)
      this.goToItem(this.currentItem - (this.items.length - 2 * this.offset), false)
      
  }
  
  /**
   * @callback moveCallback
   * @param {number} index
   */
  
  /**
   * @param {Carousel~moveCallback} cb
   */
  onMove(cb){
    this.moveCallbacks.push(cb)
  }
  
  onWindowResize(){
    let mobile = window.innerWidth < 800
    if(mobile !== this.isMobile){
      this.isMobile = mobile
      this.setStyle()
      //Launch moveCallbacks
      this.moveCallbacks.forEach(cb => cb(this.currentItem))
    }
  }
  
  /**
   * @param {string} className
   * @returns {HTMLElement}
   */
  createDivWithClass(className){
    let div = document.createElement('div')
    div.setAttribute('class', className)
    return div
  }
  
  disableTransition(){
    this.container.style.transition = 'none'
  }
  
  enableTransition(){
    this.container.style.transition = ''
  }
  
  /**
   * @returns {number} 
   */
  get slidesToScroll(){
    return this.isMobile ? 1 : this.options.slidesToScroll
  }
  
  /**
   * @returns {number} 
   */
  get slidesVisible(){
    return this.isMobile ? 1 : this.options.slidesVisible
  }
  
  /**
   * @returns {number} 
   */
  get containerWidth(){
    return this.container.offsetWidth
  }
  
  /**
   * @returns {number} 
   */
  get carouselWidth(){
    
    return this.root.offsetWidth
  }
}
