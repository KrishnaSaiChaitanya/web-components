let Divider = null;
(function () {
  let DividerComponentTemplate = document.createElement("template");
  DividerComponentTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }
    
    .divider {
      display: block;
    }
    
    .divider.horizontal {
      border: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      height: 1px;
      margin: 16px 0;
      width: 100%;
    }
    
    .divider.vertical {
      border: none;
      border-left: 1px solid var(--divider-color, #e0e0e0);
      display: inline-block;
      height: 100%;
      margin: 0 16px;
      min-height: 20px;
      width: 1px;
    }
    
    .divider.dashed {
      border: none;
      border-top: 1px dashed var(--divider-color, #e0e0e0);
      height: 1px;
      margin: 16px 0;
      width: 100%;
    }
    
    .divider.thick {
      border-width: 2px;
    }
    
    .divider.primary {
      border-color: var(--primary-color, #007bff);
    }
    
    .divider.secondary {
      border-color: var(--secondary-color, #6c757d);
    }
    
    .divider.with-text {
      display: flex;
      align-items: center;
      text-align: center;
      border: none;
    }
    
    .divider.with-text::before,
    .divider.with-text::after {
      content: '';
      flex: 1;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    
    .divider.with-text.dashed::before,
    .divider.with-text.dashed::after {
      border-top-style: dashed;
    }
    
    .divider.with-text.thick::before,
    .divider.with-text.thick::after {
      border-top-width: 2px;
    }
    
    .divider-text {
      padding: 0 16px;
      font-size: 14px;
      color: var(--text-color, #333);
    }
  </style>
  
  <div class="divider horizontal">
    <span class="divider-text"></span>
  </div>
  `;

  class Divider extends HTMLElement {
    constructor() {
      super();
      this.shadowDOM = this.attachShadow({ mode: "open" });
      this.shadowDOM.appendChild(DividerComponentTemplate.content.cloneNode(true));
      this.dividerElement = this.shadowDOM.querySelector(".divider");
      this.dividerText = this.shadowDOM.querySelector(".divider-text");
    }

    static get observedAttributes() {
      return ['orientation', 'variant', 'text', 'type', 'thickness'];
    }

    get orientation() {
      return this.getAttribute('orientation') || 'horizontal';
    }

    get variant() {
      return this.getAttribute('variant') || 'default';
    }

    get text() {
      return this.getAttribute('text') || '';
    }

    get type() {
      return this.getAttribute('type') || 'solid';
    }

    get thickness() {
      return this.getAttribute('thickness') || 'normal';
    }

    connectedCallback() {
      this.updateDivider();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.updateDivider();
      }
    }

    updateDivider() {
      this.dividerElement.classList.remove('horizontal', 'vertical');
      this.dividerElement.classList.add(this.orientation);
      
      this.dividerElement.classList.remove('primary', 'secondary');
      if (this.variant !== 'default') {
        this.dividerElement.classList.add(this.variant);
      }
      
      this.dividerElement.classList.remove('dashed');
      if (this.type === 'dashed') {
        this.dividerElement.classList.add('dashed');
      }
      
      this.dividerElement.classList.remove('thick');
      if (this.thickness === 'thick') {
        this.dividerElement.classList.add('thick');
      }
      
      if (this.text && this.orientation === 'horizontal') {
        this.dividerElement.classList.add('with-text');
        this.dividerText.textContent = this.text;
      } else {
        this.dividerElement.classList.remove('with-text');
        this.dividerText.textContent = '';
      }
    }
  }
  
  if (!customElements.get('agno-divider')) {
    customElements.define("agno-divider", Divider);
  }
  
  Divider = Divider;
})();

export { Divider };