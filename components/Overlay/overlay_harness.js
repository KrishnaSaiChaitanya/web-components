export class OverlayHarness {
  static async newOverlayComponent(options = {}) {
    const element = document.createElement('agno-overlay');
    
    if (options.type) {
      element.setAttribute('type', options.type);
    }
    
    if (options.content) {
      element.innerHTML = options.content;
    }
    
    document.body.appendChild(element);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    return new OverlayHarness(element);
  }
  
  constructor(element) {
    this.element = element;
    this.shadowRoot = element.shadowDOM || element.shadowroot;
  }
  
  get isVisible() {
    return !this.getOverlayContainer().classList.contains('hidden');
  }
  
  getOverlayContainer() {
    return this.shadowRoot.getElementById('overlay-container');
  }
  
  getOverlayContent() {
    return this.shadowRoot.getElementById('overlay-content');
  }
  
  getOverlayContentWrapper() {
    return this.shadowRoot.getElementById('overlay-content-wrapper');
  }
  
  getCloseButton() {
    return this.shadowRoot.getElementById('close');
  }
  
  async show() {
    this.element.show();
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  async hide() {
    this.element.hide();
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  async clickClose() {
    this.getCloseButton().click();
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  getElementSizeClass() {
    const content = this.getOverlayContent();
    if (content.classList.contains('small')) return 'small';
    if (content.classList.contains('default')) return 'default';
    return null;
  }
  
  hasLargeWrapper() {
    return this.getOverlayContentWrapper().classList.contains('large');
  }
  
  remove() {
    this.element.remove();
  }
}