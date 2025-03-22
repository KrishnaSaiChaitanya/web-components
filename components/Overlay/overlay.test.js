import { describe, it, expect, afterEach } from '@jest/globals';
import { OverlayHarness } from './overlay_harness.js';
import { Overlay } from './overlay.js';

describe('Overlay Component', () => {
  let overlayHarness;
  
  afterEach(() => {
    if (overlayHarness) {
      overlayHarness.remove();
      overlayHarness = null;
    }
  });
  
  it('initializes as hidden', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent();
    
    expect(overlayHarness.isVisible).toBe(false);
  });
  
  it('shows overlay when show method is called', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent();
    
    await overlayHarness.show();
    
    expect(overlayHarness.isVisible).toBe(true);
  });
  
  it('hides overlay when hide method is called', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent();
    
    await overlayHarness.show();
    expect(overlayHarness.isVisible).toBe(true);
    
    await overlayHarness.hide();
    expect(overlayHarness.isVisible).toBe(false);
  });
  
  it('hides overlay when close button is clicked', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent();
    
    await overlayHarness.show();
    expect(overlayHarness.isVisible).toBe(true);
    
    await overlayHarness.clickClose();
    expect(overlayHarness.isVisible).toBe(false);
  });
  
  it('displays content that is passed in', async () => {
    const testContent = '<p>Test overlay content</p>';
    overlayHarness = await OverlayHarness.newOverlayComponent({
      content: testContent
    });
    
    expect(overlayHarness.element.innerHTML).toBe(testContent);
  });
  
  it('applies small style ', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent({
      type: 'small'
    });
    
    expect(overlayHarness.getElementSizeClass()).toBe('small');
  });
  
  it('applies large style', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent({
      type: 'large'
    });
    
    expect(overlayHarness.hasLargeWrapper()).toBe(true);
  });
  
  it('uses default style when no type is specified', async () => {
    overlayHarness = await OverlayHarness.newOverlayComponent();
    
    expect(overlayHarness.getElementSizeClass()).toBe('default');
    expect(overlayHarness.hasLargeWrapper()).toBe(false);
  });
});