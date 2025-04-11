export class Divider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
      :host {
        display: block;
      }

      .divider {
        display: block;
        background-color: var(--divider-color, #e0e0e0);
      }

      .divider.horizontal {
        height: 1px;
        width: 100%;
        margin: 16px 0;
      }

      .divider.vertical {
        width: 1px;
        height: 100%;
        margin: 0 16px;
        display: inline-block;
      }
    </style>

    <div class="divider horizontal"></div>
    `;
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.dividerElement = this.shadowRoot.querySelector(".divider");
  }

  static get observedAttributes() {
    return ['orientation'];
  }

  get orientation() {
    return this.getAttribute('orientation') || 'horizontal';
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
    if (this.dividerElement) {
      this.dividerElement.classList.remove('horizontal', 'vertical');
      this.dividerElement.classList.add(this.orientation);
    }
  }
}


if (typeof customElements !== 'undefined') {
  if (!customElements.get('agno-divider')) {
    customElements.define("agno-divider", Divider);
  }
}