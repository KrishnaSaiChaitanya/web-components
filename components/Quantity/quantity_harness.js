export class QuantityHarness {
  static async newQuantityComponent(options = {}) {
    const element = document.createElement('agno-quantity');
    
    if (options.isSecondary) {
      element.setAttribute('isSecondary', 'true');
    }
    
    document.body.appendChild(element);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    return new QuantityHarness(element);
  }
  
  constructor(element) {
    this.element = element;
    this.shadowRoot = element.shadowDOM || element.shadowroot;
  }
  
  get value() {
    return parseInt(this.getQuantityInput().value);
  }
  
  get isDecrementDisabled() {
    return this.getDecrementButton().getAttribute('aria-disabled') === 'true';
  }
  
  getQuantityInput() {
    return this.shadowRoot.getElementById('quantity-counter');
  }
  
  getIncrementButton() {
    return this.shadowRoot.getElementById('increment');
  }
  
  getDecrementButton() {
    return this.shadowRoot.getElementById('decrement');
  }
  
  async increment() {
    this.getIncrementButton().click();
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  async decrement() {
    this.getDecrementButton().click();
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  hasSecondaryStyle() {
    return this.shadowRoot.getElementById('quantity__buttons').classList.contains('wag');
  }
  
  remove() {
    this.element.remove();
  }
}