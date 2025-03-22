import { Image } from './image.js';

export class ImageHarness {
  static async newImageComponent(data = {}) {
    const element = document.createElement('agno-image');
    
    if (data.src) {
      element.setAttribute('src', data.src);
    }
    
    if (data.alt) {
      element.setAttribute('alt', data.alt);
    }
    
    if (data.loading) {
      element.setAttribute('loading', data.loading);
    }
    
    document.body.appendChild(element);
    
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return new ImageHarness(element);
  }
  
  constructor(element) {
    this.element = element;
  }
  
  get src() {
    const img = this.element.shadowRoot.querySelector('img');
    return img ? img.getAttribute('src') || '' : '';
  }
  
  get alt() {
    const img = this.element.shadowRoot.querySelector('img');
    return img ? img.getAttribute('alt') || '' : '';
  }
  
  get loading() {
    const img = this.element.shadowRoot.querySelector('img');
    return img ? img.getAttribute('loading') || '' : '';
  }
  
  get height() {
    const img = this.element.shadowRoot.querySelector('img');
    return img ? img.style.height || '' : '';
  }
}