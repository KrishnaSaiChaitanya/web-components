// show-more.js
class ShowMore extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .show-more-container {
          border-top: none;
          font-size: 1.125rem;
          line-height: 1.78;
        }
        .show-more-container button {
          background: var(--button-bg-color, var(--palette-brand-neutral));
          border-radius: 4px;
          padding: 12px 16px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1rem;
          color: var(--palette-brand-charcoal);
          text-decoration: none;
        }
        .show-more-container button:hover {
          text-decoration: underline;
        }
        .show-more-container button .icon {
          margin-left: 8px;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .content-hidden {
          display: none;
        }
        .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="show-more-container" role="region" aria-live="polite">
        <div class="summary" tabindex="0">
          <slot name="summary"></slot>
        </div>
        <div class="content-hidden" id="content">
          <slot name="content"></slot>
        </div>
        <button type="button" aria-expanded="false" aria-controls="content" tabindex="0">
          <span class="show-more-text">Show More</span>
          <span class="icon">
            <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>arrow-down</title>
              <path data-path-down="M16 24.145c-0.436 0-0.873-0.175-1.222-0.495l-12.829-12.858c-0.669-0.669-0.669-1.745 0-2.415s1.745-0.669 2.415 0l11.636 11.636 11.636-11.636c0.669-0.669 1.745-0.669 2.415 0s0.669 1.745 0 2.415l-12.829 12.858c-0.349 0.32-0.785 0.495-1.222 0.495z"
                    data-path-up="M28.829 24.145c-0.436 0-0.873-0.175-1.222-0.495l-11.636-11.636-11.636 11.636c-0.669 0.669-1.745 0.669-2.415 0s-0.669-1.745 0-2.415l12.829-12.858c0.669-0.669 1.745-0.669 2.415 0l12.829 12.858c0.669 0.669 0.669 1.745 0 2.415-0.291 0.32-0.727 0.495-1.164 0.495z"
                    d="M16 24.145c-0.436 0-0.873-0.175-1.222-0.495l-12.829-12.858c-0.669-0.669-0.669-1.745 0-2.415s1.745-0.669 2.415 0l11.636 11.636 11.636-11.636c0.669-0.669 1.745-0.669 2.415 0s0.669 1.745 0 2.415l-12.829 12.858c-0.349 0.32-0.785 0.495-1.222 0.495z">
              </path>
            </svg>
          </span>
        </button>
      </div>
    `;
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.content = this.shadowRoot.querySelector(".content-hidden");
    this.button = this.shadowRoot.querySelector("button");
    this.showMoreText = this.shadowRoot.querySelector(".show-more-text");
    this.iconArrowPath = this.shadowRoot.querySelector(".icon-arrow path");
    this.toggleContent = this.toggleContent.bind(this);
  }

  static get observedAttributes() {
    return ["display-button"];
  }

  get displayButton() {
    return this.getAttribute("display-button") === "true";
  }

  toggleContent() {
    const isExpanded = this.button.getAttribute("aria-expanded") === "true";
    this.button.setAttribute("aria-expanded", !isExpanded);
    this.content.classList.toggle("content-hidden", isExpanded);
    this.showMoreText.textContent = isExpanded ? "Show More" : "Show Less";

    const pathDown = this.iconArrowPath.getAttribute("data-path-down");
    const pathUp = this.iconArrowPath.getAttribute("data-path-up");
    this.iconArrowPath.setAttribute("d", isExpanded ? pathDown : pathUp);
  }

  connectedCallback() {
    if (!this.handleClick) {
      this.handleClick = this.toggleContent.bind(this);
    }
    this.button.addEventListener("click", this.handleClick);
  }
  
  disconnectedCallback() {
    if (this.handleClick) {
      this.button.removeEventListener("click", this.handleClick);
    }
  }

  attributeChangedCallback() {
    this.updateStyles();
  }

  updateStyles() {
    this.button.style.background = this.displayButton ? "var(--button-bg-color, #F4F2EF)" : "var(--palette-brand-neutral)";
  }
}

// Only define the component if it's not already defined
if (!customElements.get('agno-show-more')) {
  customElements.define('agno-show-more', ShowMore);
}

export { ShowMore };