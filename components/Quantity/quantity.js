let Quantity = null;
(function () {
  let QuantityComponentTemplate = document.createElement("template");
  QuantityComponentTemplate.innerHTML = `
  <link rel="stylesheet" href="../../assets/css/global.css">
  <link rel="stylesheet" href="../../assets/css/color.css">
  <style>
  .btn {
    position: relative;
    min-width: 104px;
    min-height: 44px;
    padding: 0 20px;
    border-radius: 45px;
    background: var(--palette-brand-charcoal);
    color: #fff;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
  .quantity__buttons {
    display: flex;
    align-items: center;
    max-width: 170px;
    padding: 12px 0;
  }
  .quantity__buttons input {
    padding: 10px 4px;
    min-height: auto;
    border: 1px solid var(--border-divider);
    margin: 0 8px;
    height: 44px;
    width: 44px;
    text-align: center;
    border-radius: 8px;
    outline-width: 1px;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .quantity__buttons .btn {
    margin-top: 0;
  }
  .btn.btn__secondary.btn__disabled,
  .btn.btn__primary.btn__disabled {
    background: var(--palette-gray-100);
    color: var(--palette-gray-400);
    pointer-events: none;
    box-shadow: none;
  }
  .btn__rounded {
    text-align: center;
    padding: 0;
    margin: 0;
    border-radius: 50%;
    min-width: 44px;
  }
  .quantity__buttons .btn .icon_lsg svg {
    width: 16px;
    height: 16px;
  }
  .quantity__buttons input:focus {
    border: 1px solid var(--palette-brand-charcoal);
  }
  div.quantity__buttons.wag {
    display: flex;
  }
  div.quantity__buttons.wag button {
    background: none;
    outline-offset: 0px;
  }
  div.quantity__buttons.wag button input.quantity {
    border-left: none;
    border-right: none;
  }
  div.quantity__buttons.wag button span.icon {
    width: 16px;
    height: 16px;
  }
  div.quantity__buttons.wag button.qtyminus {
    border-radius: 0px;
    width: 44px;
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
    margin-right: -1px;
  }
  div.quantity__buttons.wag button.qtyplus {
    border-radius: 0px;
    width: 44px;
    border-bottom-right-radius: 100%;
    border-top-right-radius: 100%;
    margin-left: -1px;
  }
  div.quantity__buttons.wag input {
    height: 44px;
    text-align: center;
    margin: 0px;
    border-radius: 0px;
    color: var(--palette-brand-charcoal);
    border-color: var(--palette-brand-charcoal);
  }
  .btn.btn__primary,
  .btn.btn__secondary,
  .btn.btn__blue {
    background: var(--palette-brand-crimson);
    color: var(--palette-brand-white);
    box-sizing: border-box;
    border: 1px solid transparent;
  }
  .btn__rounded .icon {
    margin: 0px;
    min-width: 15px;
    min-height: 15px;
  }
  .btn.btn__primary.btn__disabled .icon svg {
    fill: var(--palette-gray-400);
  }
  .btn.btn__secondary:hover .icon svg,
  .btn.btn__primary:hover:active .icon svg,
  .btn.btn__primary .icon svg {
    fill: var(--palette-brand-white);
  }
  .btn.btn__secondary:hover:active .icon svg,
  .btn.btn__secondary:focus .icon svg,
  .btn.btn__primary:focus .icon svg,
  .btn.btn__primary:hover .icon svg {
    fill: var(--palette-brand-charcoal);
  }
  .btn.btn__primary:hover,
  .btn.btn__blue:hover {
    background: var(--palette-brand-white);
    color: var(--palette-brand-charcoal);
    border: 1px solid var(--palette-brand-charcoal);
  }
  .btn.btn__primary:focus,
  .btn.btn__blue:focus {
    background: var(--palette-brand-crimson);
    color: var(--palette-brand-white);
  }
  .btn.btn__primary.btn__disabled:active,
  .btn.btn__primary.btn__disabled:hover:active {
    transform: none;
    background: var(--palette-gray-100);
    color: var(--palette-gray-400);
    pointer-events: none;
  }
  .btn.btn__primary:active,
  .btn.btn__primary:hover:active,
  .btn.btn__blue:active,
  .btn.btn__blue:hover:active {
    transform: none;
    background: var(--palette-brand-neutral);
    border: 1px solid var(--palette-brand-charcoal);
    color: var(--palette-brand-charcoal);
    outline: solid 2px var(--palette-brand-crimson);
    outline-offset: -1px;
  }
  .btn.btn__secondary {
    background: var(--palette-brand-white);
    color: var(--palette-brand-charcoal);
    border: 1px solid var(--palette-brand-charcoal);
    box-sizing: border-box;
  }
  .btn.btn__secondary:hover {
    background: var(--palette-brand-crimson);
    color: var(--palette-brand-white);
    border-color: var(--palette-gray-600);
  }
  .btn.btn__secondary:focus {
    background: var(--palette-brand-white);
    color: var(--palette-brand-charcoal);
    border-color: var(--palette-brand-charcoal);
    outline: solid 2px var(--palette-brand-crimson);
    outline-offset: -1px;
  }
  .btn.btn__secondary:active,
  .btn.btn__secondary:hover:active {
    transform: none;
    background: var(--palette-brand-neutral);
    border: 1px solid var(--palette-brand-charcoal);
    color: var(--palette-brand-charcoal);
    outline: solid 2px var(--palette-brand-crimson);
    outline-offset: -1px;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  
  </style>
  <div id="quantity__buttons" class="quantity__buttons">
  <button id="decrement" class="btn btn__primary btn__rounded qtyminus btn__disabled" aria-label="decrease" aria-disabled="true">
    <span class="icon icon_lsg icon__minus-v2">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>subtract-v2</title>
    <path d="M28.829 17.745h-25.658c-0.96 0-1.716-0.785-1.716-1.745s0.756-1.745 1.716-1.745h25.658c0.931 0 1.716 0.785 1.716 1.745s-0.756 1.745-1.716 1.745z"></path>
    </svg>
    </span>
  </button>

  <label for="quantity-counter" class="sr-only">Item Quantity</label>
  <input class="quantity" id="quantity-counter" type="text" name="text" value="1" aria-live="polite">

  <button id="increment" class="btn btn__primary btn__rounded qtyplus" aria-label="increase">
    <span class="icon icon_lsg icon__plus-v2">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>plus-add-v2</title>
    <path d="M28.829 14.284h-11.113v-11.113c0-0.96-0.785-1.716-1.716-1.716s-1.716 0.756-1.716 1.716v11.113h-11.113c-0.96 0-1.716 0.785-1.716 1.716s0.756 1.716 1.716 1.716h11.113v11.113c0 0.931 0.756 1.716 1.716 1.716s1.716-0.756 1.716-1.716v-11.113h11.113c0.931 0 1.716-0.756 1.716-1.716s-0.756-1.716-1.716-1.716z"></path>
    </svg>
    </span>
  </button>
  </div>
    `;

  class Quantity extends HTMLElement {
    static formAssociated = true;
    constructor() {
      super();
      this._internals = this.attachInternals();
      const template = QuantityComponentTemplate;
      this.shadowroot = this.attachShadow({ mode: "open" });
      this.shadowroot.appendChild(template.content.cloneNode(true));
      this.buttonContainer = this.shadowroot.getElementById("quantity__buttons");
      this.decrementButton = this.shadowroot.getElementById("decrement");
      this.incrementButton = this.shadowroot.getElementById("increment");
      this.quantityInput = this.shadowroot.getElementById("quantity-counter");
      this.handleIncrement = this.handleIncrement.bind(this);
      this.handleDecrement = this.handleDecrement.bind(this);
    }

    handleIncrement(e){
      e.preventDefault();
      const value = parseInt(this.quantityInput.value) + 1;
      this.quantityInput.value = parseInt(this.quantityInput.value) + 1;
      if(value > 1 && this.decrementButton.classList.contains('btn__disabled')){
        this.decrementButton.classList.remove('btn__disabled');
        this.decrementButton.classList.add('btn__blue');
        this.decrementButton.setAttribute('aria-disabled', false);
      }
      if(value < 2){
        this.decrementButton.classList.remove('btn__blue');
        this.decrementButton.classList.add('btn__disabled');
        this.decrementButton.setAttribute('aria-disabled', true);
      }
    }
    handleDecrement(e) {
      e.preventDefault();
      if (parseInt(this.quantityInput.value) > 1) {
        const value = parseInt(this.quantityInput.value) - 1
        this.quantityInput.value = value;
        if(value < 2){
          this.decrementButton.classList.remove('btn__blue');
          this.decrementButton.classList.add('btn__disabled');
          this.decrementButton.setAttribute('aria-disabled', true);
        }
      }
    }
    get isSecondary(){
      return this.getAttribute('isSecondary') === 'true' ? true : false;
    }
    connectedCallback() {
      if(this.isSecondary){
        this.buttonContainer.classList.add('wag');
        this.incrementButton.classList.remove('btn__primary');
        this.incrementButton.classList.add('btn__secondary');
        this.decrementButton.classList.remove('btn__primary');
        this.decrementButton.classList.add('btn__secondary');
      }
      this.incrementButton.addEventListener("click", this.handleIncrement);
      this.decrementButton.addEventListener("click", this.handleDecrement);
    }
  }
  customElements.define("agno-quantity", Quantity);
  Quantity = Quantity;
})();

export { Quantity };
