import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { QuantityHarness } from './quantity_harness.js';
import { Quantity } from './quantity.js';

describe('Quantity Component', () => {
  let quantityHarness;
  
  afterEach(() => {
    if (quantityHarness) {
      quantityHarness.remove();
      quantityHarness = null;
    }
  });
  
  it('initializes with default value of 1', async () => {
    quantityHarness = await QuantityHarness.newQuantityComponent();
    
    expect(quantityHarness.value).toBe(1);
    expect(quantityHarness.isDecrementDisabled).toBe(true);
  });
  
  it('increments value when clicking increment button', async () => {
    quantityHarness = await QuantityHarness.newQuantityComponent();
    
    await quantityHarness.increment();
    
    expect(quantityHarness.value).toBe(2);
    expect(quantityHarness.isDecrementDisabled).toBe(false);
  });
  
  it('decrements value when clicking decrement button and value is greater than 1', async () => {
    quantityHarness = await QuantityHarness.newQuantityComponent();
    
    await quantityHarness.increment();
    expect(quantityHarness.value).toBe(2);
    
    await quantityHarness.decrement();
    expect(quantityHarness.value).toBe(1);
    expect(quantityHarness.isDecrementDisabled).toBe(true);
  });
  
  it('does not decrement below 1', async () => {
    quantityHarness = await QuantityHarness.newQuantityComponent();
    
    expect(quantityHarness.value).toBe(1);
    
    await quantityHarness.decrement();
    
    expect(quantityHarness.value).toBe(1);
    expect(quantityHarness.isDecrementDisabled).toBe(true);
  });
  
  it('applies secondary styling when isSecondary is true', async () => {
    quantityHarness = await QuantityHarness.newQuantityComponent({
      isSecondary: true
    });
    
    expect(quantityHarness.hasSecondaryStyle()).toBe(true);
    
    const incrementButton = quantityHarness.getIncrementButton();
    const decrementButton = quantityHarness.getDecrementButton();
    
    expect(incrementButton.classList.contains('btn__secondary')).toBe(true);
    expect(incrementButton.classList.contains('btn__primary')).toBe(false);
    
    expect(decrementButton.classList.contains('btn__secondary')).toBe(true);
    expect(decrementButton.classList.contains('btn__primary')).toBe(false);
  });
  
  it('enables decrement button when value is greater than 1', async () => {
    quantityHarness = await QuantityHarness.newQuantityComponent();
    
    const decrementButton = quantityHarness.getDecrementButton();
    expect(decrementButton.classList.contains('btn__disabled')).toBe(true);
    expect(decrementButton.getAttribute('aria-disabled')).toBe('true');
    
    await quantityHarness.increment();
    expect(decrementButton.classList.contains('btn__disabled')).toBe(false);
    expect(decrementButton.classList.contains('btn__blue')).toBe(true);
    expect(decrementButton.getAttribute('aria-disabled')).toBe('false');
    
    await quantityHarness.decrement();
    expect(decrementButton.classList.contains('btn__disabled')).toBe(true);
    expect(decrementButton.classList.contains('btn__blue')).toBe(false);
    expect(decrementButton.getAttribute('aria-disabled')).toBe('true');
  });
});