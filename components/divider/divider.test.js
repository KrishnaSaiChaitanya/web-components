import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { DividerHarness } from './divider_harness.js';
import { Divider } from './divider.js';

if (typeof customElements === 'undefined') {
  global.customElements = {
    define: jest.fn(),
    get: jest.fn(() => undefined)
  };
}

describe('agno-divider', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    if (!customElements.get('agno-divider')) {
      customElements.define('agno-divider', Divider);
    }
  });

  afterEach(() => {
    document.querySelectorAll('agno-divider').forEach(element => {
      element.remove();
    });
  });

  it('should create a divider with default horizontal orientation', async () => {
    const harness = await DividerHarness.newDividerComponent();
    
    expect(harness.orientation).toBe('horizontal');
    expect(harness.hasHorizontalClass).toBe(true);
    expect(harness.hasVerticalClass).toBe(false);
    
    harness.remove();
  });

  it('should create a divider with vertical orientation when specified', async () => {
    const harness = await DividerHarness.newDividerComponent({
      orientation: 'vertical'
    });
    
    expect(harness.orientation).toBe('vertical');
    expect(harness.hasVerticalClass).toBe(true);
    expect(harness.hasHorizontalClass).toBe(false);
    
    harness.remove();
  });

  it('should update orientation when attribute changes', async () => {
    const harness = await DividerHarness.newDividerComponent();
    
    expect(harness.orientation).toBe('horizontal');
    expect(harness.hasHorizontalClass).toBe(true);
    
    harness.orientation = 'vertical';
    
    await new Promise(resolve => setTimeout(resolve, 20));
    
    expect(harness.orientation).toBe('vertical');
    expect(harness.hasVerticalClass).toBe(true);
    expect(harness.hasHorizontalClass).toBe(false);
    
    harness.remove();
  });

  it('should handle switching between orientations multiple times', async () => {
    const harness = await DividerHarness.newDividerComponent({
      orientation: 'vertical'
    });
    
    expect(harness.hasVerticalClass).toBe(true);
    
    harness.orientation = 'horizontal';
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(harness.hasHorizontalClass).toBe(true);
    expect(harness.hasVerticalClass).toBe(false);
    
    harness.orientation = 'vertical';
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(harness.hasVerticalClass).toBe(true);
    expect(harness.hasHorizontalClass).toBe(false);
    
    harness.remove();
  });

  it('should have the correct shadow DOM structure', async () => {
    const harness = await DividerHarness.newDividerComponent();
    
    const dividerElement = harness.dividerElement;
    expect(dividerElement).not.toBeNull();
    expect(dividerElement.tagName.toLowerCase()).toBe('div');
    expect(dividerElement.classList.contains('divider')).toBe(true);
    
    harness.remove();
  });
});