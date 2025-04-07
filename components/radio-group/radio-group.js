import DOMPurify from "../../utils/dom-purify.js";

let RadioButtonGroup = null;
(function () {
  let RadioTemplate = document.createElement('template');
  RadioTemplate.innerHTML = `
  <link rel="stylesheet" href="../../css/colour.css">
  <style>
    .disabled {
      pointer-events: none;
      color: var(--palette-gray-400);
    }
    .display_row {
      display: flex;
      flex-direction: row;
    }
    .display_row .btn__radio {
      margin-right: 15px;
    }
    .display_column .btn__radio {
      margin-top: 10px;
    }
    .display_column {
      display: flex;
      flex-direction: column;
    }
    .btn__radio {
      position: relative;
      width: fit-content;
    }
    input[type="radio"] {
      opacity: 0;
      position: absolute;
    }
    .radio__label {
      display: flex;
    }
    .disabled .radio__input:checked + .radio__label:before {
      pointer-events: none;
      box-shadow: inset 0 0 0 4px var(--palette-brand-neutral);
      border-color: var(--palette-gray-100);
      background: var(--palette-gray-200);
    }
    .disabled .radio__input + .radio__label:before {
      pointer-events: none;
      box-shadow: inset 0 0 0 20px var(--palette-brand-neutral);
      border-color: var(--palette-gray-100);
      background: var(--palette-gray-200);
    }
    input[type="radio"]:disabled + .radio__label {
      pointer-events: none;
      color: var(--palette-gray-200);
    }
    input[type="radio"]:disabled + .radio__label:before {
      pointer-events: none;
      box-shadow: inset 0 0 0 4px var(--palette-brand-neutral);
      border-color: var(--palette-gray-100);
    }
    input[type="radio"] + .radio__label:before {
      content: "";
      background: var(--palette-brand-neutral);
      border-radius: 100%;
      border: 1px solid var(--border-input-default);
      display: inline-block;
      width: 24px;
      height: 24px;
      top: -0.2em;
      margin-right: 0.6em;
      vertical-align: top;
      cursor: pointer;
      text-align: center;
      margin-top: auto;
      margin-bottom: auto;
      transition: all 250ms ease;
    }
    input[type="radio"]:checked + .radio__label:before {
      background-color: var(--palette-brand-charcoal);
      box-shadow: inset 0 0 0 4px var(--palette-brand-neutral);
    }
    .radio__label{
     line-height: 2;
    }
    input[type="radio"]:checked + .radio__label[data-theme="theme2"]:before {
      background-color: var(--palette-feedback-info);
    }
    input[type="radio"]:focus + .radio__label:before {
      outline: none;
      outline-offset: 2px;
      border-color: var(--palette-feedback-info);
    }
    input[type="radio"]:focus + .radio__label {
      outline: 1px solid var(--palette-feedback-info);
      outline-offset: 2px;
      border-color: var(--palette-feedback-info);
      background-color: var(--palette-brand-neutral);
    }
    .hide {
      display: none;
    }
    .show {
      display: flex;
    }
    .asterisk_color {
      color: var(--palette-brand-brand-red);
    }
    .error {
      color: var(--palette-feedback-error);
      margin-top: 8px;
    }
    .icon {
      position: relative;
      min-width: 30px;
      min-height: 30px;
      overflow: hidden;
    }
    img {
      fill: var(--palette-feedback-error);
      width: 24px;
      height: 24px;
    }
    .icon svg {
      fill: var(--palette-feedback-error);
      width: 24px;
      height: 24px;
    }
    strong {
      font-size: 100%;
    }
    .radio__label.multi-line {
      white-space: normal;
      word-wrap: break-word;
    }
    .btn__radio.hover:hover input[type="radio"] + .radio__label:before {
     background-color: var(--palette-brand-charcoal);
     box-shadow: inset 0 0 0 4px var(--palette-brand-neutral);
    }
    .radio__label.multi-line:before {
     flex-shrink: 0;
    }
  </style>
  <div id="radio__container">
    <div id="required" class="required hide" role="none">
      <span class="asterisk_color">*</span>
      <span><strong id="requiredText" class="requiredText" role="alert"></strong></span>
    </div>
    <div id="error" class="error hide">
      <span class="icon icon_lsg icon__alert">
        <svg aria-hidden="true" aria-label="alert icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>alert</title>
          <path d="M16 19.578c-0.727 0-1.338-0.582-1.338-1.338v-7.331c0-0.727 0.611-1.338 1.338-1.338s1.338 0.582 1.338 1.338v7.331c0 0.727-0.611 1.338-1.338 1.338z"></path>
          <path d="M17.338 23.302c0 0.739-0.599 1.338-1.338 1.338s-1.338-0.599-1.338-1.338c0-0.739 0.599-1.338 1.338-1.338s1.338 0.599 1.338 1.338z"></path>
          <path d="M27.113 29.673h-22.225c-1.222 0-2.327-0.64-2.967-1.687s-0.64-2.327-0.058-3.404l11.113-20.48c0.611-1.076 1.775-1.775 3.025-1.775s2.415 0.698 3.025 1.804l11.113 20.48c0.582 1.076 0.553 2.356-0.058 3.404-0.64 1.018-1.745 1.658-2.967 1.658zM15.127 5.295l-11.113 20.451c-0.233 0.436-0.058 0.844 0.029 0.989s0.349 0.495 0.873 0.495h22.196c0.524 0 0.785-0.349 0.873-0.495s0.262-0.524 0.029-0.989l-11.142-20.451c-0.262-0.465-0.698-0.524-0.873-0.524s-0.611 0.058-0.873 0.524v0z"></path>
        </svg>
      </span>
      <span id="errorText" class="errorText"></span>
    </div>
    <div id="radio_group_container" class="radio_group_container" role="radiogroup" tabindex="0"></div>
  </div>
  `;


  class Radio extends HTMLElement {
    static formAssociated = true;
    constructor() {
      super();
      this._internals = this.attachInternals();
      this.shadowroot = this.attachShadow({ mode: 'open' });
      this.shadowroot.appendChild(RadioTemplate.content.cloneNode(true));
      this.container = this.shadowroot.getElementById('radio__container');
      this.radioContainer = this.shadowroot.getElementById('radio_group_container');
      this.requiredContainer = this.shadowroot.getElementById('required');
      this.errorContainer = this.shadowroot.getElementById('error');
      this.requiredText = this.shadowroot.getElementById('requiredText');
      this.errorText = this.shadowroot.getElementById('errorText');
      this.onCheckbox = this.onCheckbox.bind(this);
    }
    
    parseJsonData(data) {
      try {
        const jsonData = DOMPurify.sanitize(data);
        let result = jsonData.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        result = result.replace(/'/g, '"');
        return JSON.parse(result);
      } catch (err) {
        return [];
      }
    }
    
    get form() {
      return this._internals.form;
    }
    
    get name() {
      return this.getAttribute('name');
    }
    
    get handler() {
      return this.getAttribute('handler');
    }
    
    set handler(value) {
      return this.setAttribute('handler', value);
    }
    
    defaultHandler() {
      return null;
    }
    
    onCheckbox(e, id) {
      const input = this.shadowroot.querySelectorAll('input[type="radio"]');
      this._internals.setFormValue(e.target.value);
      input.forEach(item => {
        if (item.id === id) {
          item.setAttribute('aria-checked', true);
          item.setAttribute('checked', true);
          item.setAttribute('tabindex', 0);
        } else {
          item.setAttribute('aria-checked', false);
          item.removeAttribute('checked');
          item.setAttribute('tabindex', -1);
        }
      });
      let handler = this.handler && typeof window[this.handler] === 'function' ? window[this.handler] : this.defaultHandler;
      handler(e);
    }
    
    createInputElement(inputProps) {
      const { id, labelId, group, value, error = '', disabled = false, checked = false } = inputProps;
      const input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.setAttribute('id', id);
      input.setAttribute('name', group);
      input.setAttribute('value', value);
      input.setAttribute('aria-labelledby', labelId);
      input.setAttribute('aria-checked', checked);
      input.setAttribute('class', 'radio__input');
      if (checked) {
        input.setAttribute('tabindex', 0);
        input.setAttribute('checked', checked);
      } else {
        input.setAttribute('tabindex', -1);
      }
      if (disabled) {
        input.setAttribute('disabled', true);
        input.setAttribute('aria-disabled', true);
      }
      if (error) {
        const errorId = `errorText_${id}`;
        input.setAttribute('aria-describedby', errorId);
        this.errorText.setAttribute('id', errorId);
      }
      input.addEventListener('change', e => this.onCheckbox(e, id));
      return input;
    }
    
    createLabelElement(id, labelId, text, theme) {
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.setAttribute('class', 'radio__label');
      label.setAttribute('id', labelId);
      label.innerText = text;
      if(theme === "theme2") {
        label.setAttribute('data-theme', 'theme2');
      } else if(theme === "theme1") {
        label.setAttribute('data-theme', 'theme1');
      }
      return label;
    }
    
    connectedCallback() {
      const radio = this.getAttribute('radioData') || '[]';
      const direction = this.getAttribute('direction') || 'column';
      const group = this.getAttribute('groupName') || 'radio_group';
      const groupDisabled = this.getAttribute('groupDisabled') || false;
      const required = this.getAttribute('required') || '';
      const requiredText = this.getAttribute('requiredText') || '';
      const error = this.getAttribute('error') || '';
      
      let data = this.parseJsonData(radio);
      if (data && data.length > 0) {
        data.forEach((item, index) => {
          const id = `${group}_${index}`;
          const { label, value, disabled = false, checked = false, multiLine = false, hover = false, theme } = item;
          const labelId = `label_${id}`;
          const inputProps = {
            id,
            labelId,
            group,
            value,
            disabled,
            checked,
            error,
          };
          const inputElement = this.createInputElement(inputProps);
          const labelElement = this.createLabelElement(id, labelId, label, theme);
          if(multiLine){
            labelElement.classList.add("multi-line");
          }
          const div = document.createElement('div');
          div.setAttribute('class', 'btn__radio');
          if(hover){
            div.classList.add("hover");
          }
          div.setAttribute('tabindex', '-1');
          div.appendChild(inputElement);
          div.appendChild(labelElement);
          this.radioContainer.appendChild(div);
        });
      }
      
      if (groupDisabled === 'true' || groupDisabled === true) {
        this.radioContainer.classList.add('disabled');
      }
      
      if (required || requiredText) {
        this.requiredContainer.classList.remove('hide');
        this.requiredContainer.classList.add('show');
        this.requiredText.innerHTML = requiredText;
        this.radioContainer.setAttribute('aria-required', 'true');
        const requiredId = `requiredText_${group}`;
        this.requiredText.setAttribute('id', requiredId);
        this.radioContainer.setAttribute('aria-describedby', requiredId);
      }
      
      if (error) {
        this.errorContainer.classList.remove('hide');
        this.errorContainer.classList.add('show');
        this.errorText.innerHTML = error;
        this.errorContainer.setAttribute('aria-live', 'assertive');
        this.errorContainer.setAttribute('aria-atomic', 'true');
      }
      
      if (direction === 'column') {
        this.radioContainer.classList.add('display_column');
      }
      
      if (direction === 'row') {
        this.radioContainer.classList.add('display_row');
      }
      
      this.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const focusedRadio = this.shadowroot.activeElement;
          if (focusedRadio && focusedRadio.tagName === 'INPUT' && focusedRadio.type === 'radio') {
            focusedRadio.checked = true;
            focusedRadio.dispatchEvent(new Event('change'));
          }
        }
      });
    }
  }
  
  customElements.define('agno-radio-button-group', Radio);
  RadioButtonGroup = Radio;
})();

export { RadioButtonGroup };