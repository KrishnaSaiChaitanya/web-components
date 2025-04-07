export class RadioGroupHarness {
  static async newRadioGroupComponent(options = {}) {
    const element = document.createElement('agno-radio-button-group');
    
    if (options.radioData) {
      element.setAttribute('radioData', options.radioData);
    }
    
    if (options.direction) {
      element.setAttribute('direction', options.direction);
    }
    
    if (options.groupName) {
      element.setAttribute('groupName', options.groupName);
    }
    
    if (options.groupDisabled) {
      element.setAttribute('groupDisabled', options.groupDisabled);
    }
    
    if (options.required) {
      element.setAttribute('required', options.required);
    }
    
    if (options.requiredText) {
      element.setAttribute('requiredText', options.requiredText);
    }
    
    if (options.error) {
      element.setAttribute('error', options.error);
    }
    
    if (options.handler) {
      element.setAttribute('handler', options.handler);
    }
    
    document.body.appendChild(element);
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    return new RadioGroupHarness(element);
  }
  
  constructor(element) {
    this.element = element;
    this.shadowRoot = element.shadowroot;
  }
  
  getRadioContainer() {
    return this.shadowRoot.getElementById('radio_group_container');
  }
  
  getRadioButtons() {
    return this.shadowRoot.querySelectorAll('input[type="radio"]');
  }
  
  getRadioLabels() {
    return this.shadowRoot.querySelectorAll('label.radio__label');
  }
  
  getRequiredContainer() {
    return this.shadowRoot.getElementById('required');
  }
  
  getErrorContainer() {
    return this.shadowRoot.getElementById('error');
  }
  
  getCheckedRadio() {
    return this.shadowRoot.querySelector('input[type="radio"][checked]');
  }
  
  getRadioByIndex(index) {
    const radios = this.getRadioButtons();
    return radios[index];
  }
  
  getLabelByIndex(index) {
    const labels = this.getRadioLabels();
    return labels[index];
  }
  
  async selectRadioByIndex(index) {
    const radio = this.getRadioByIndex(index);
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  getRequiredText() {
    return this.shadowRoot.getElementById('requiredText').textContent;
  }
  
  getErrorText() {
    return this.shadowRoot.getElementById('errorText').textContent;
  }
  
  hasDirection(direction) {
    const container = this.getRadioContainer();
    return container.classList.contains(`display_${direction}`);
  }
  
  isGroupDisabled() {
    const container = this.getRadioContainer();
    return container.classList.contains('disabled');
  }
  
  remove() {
    this.element.remove();
  }
}