let Image = null;
(function () {
  class Image extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this.image = document.createElement('img');
      this._shadowRoot.appendChild(this.image);
      
      this.updateImage();
    }
    
    static get observedAttributes() {
      return ['src', 'alt', 'loading'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      this.updateImage();
    }
    
    updateImage() {
      if (this.getAttribute('src')) {
        this.image.setAttribute('src', this.getAttribute('src'));
      }
      
      if (this.getAttribute('alt')) {
        this.image.setAttribute('alt', this.getAttribute('alt'));
      } else {
        this.image.setAttribute('alt', 'Image');
      }
      
      if (this.getAttribute('loading')) {
        this.image.setAttribute('loading', this.getAttribute('loading'));
      } else {
        this.image.setAttribute('loading', 'lazy');
      }
      
      this.image.style.height = '150';
    }
    
    setAttributes(el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    }
  }
  customElements.define('agno-image', Image);
  Image = Image;
})();
export { Image };