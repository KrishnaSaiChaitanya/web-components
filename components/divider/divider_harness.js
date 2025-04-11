import { Divider } from './divider.js';

export class DividerHarness {
  static async newDividerComponent(data = {}) {
    if (typeof customElements !== 'undefined' && !customElements.get('agno-divider')) {
      customElements.define('agno-divider', Divider);
    }

    const element = document.createElement('agno-divider');
    
    if (data.orientation) {
      element.setAttribute('orientation', data.orientation);
    }
    
    document.body.appendChild(element);

    await new Promise(resolve => setTimeout(resolve, 50));
    
    return new DividerHarness(element);
  }
  
  constructor(element) {
    this.element = element;
  }
  
  get orientation() {
    return this.element.getAttribute('orientation') || 'horizontal';
  }
  
  get dividerElement() {
    if (!this.element.shadowRoot) {
      return null;
    }
    return this.element.shadowRoot.querySelector('.divider');
  }
  
  get hasHorizontalClass() {
    const divider = this.dividerElement;
    return divider ? divider.classList.contains('horizontal') : false;
  }
  
  get hasVerticalClass() {
    const divider = this.dividerElement;
    return divider ? divider.classList.contains('vertical') : false;
  }
  
  set orientation(value) {
    this.element.setAttribute('orientation', value);
  }
  
  remove() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}