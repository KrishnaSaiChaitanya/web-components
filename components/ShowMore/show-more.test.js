import { describe, it, expect } from '@jest/globals';
import { ShowMoreHarness } from './show-more_harness.js';
import { ShowMore } from './show-more.js';

// Make sure ShowMore is defined
// customElements.define('agno-show-more', ShowMore);

describe('ShowMore', () => {
  it('renders summary and content slots', async () => {
    const data = {
      summary: 'This is the summary',
      content: 'This is the hidden content',
      displayButton: 'true',
    };
    const showMore = await ShowMoreHarness.newShowMoreComponent(data);

    expect(showMore.summaryText).toBe(data.summary);
    expect(showMore.contentText).toBe(data.content);
  });

  it('hides content by default', async () => {
    const showMore = await ShowMoreHarness.newShowMoreComponent({
      summary: 'Summary',
      content: 'Content'
    });

    expect(showMore.isContentHidden).toBe(true);
    expect(showMore.buttonText).toBe('Show More');
    expect(showMore.buttonAriaExpanded).toBe('false');
  });

  it('toggles content visibility on button click', async () => {
    const showMore = await ShowMoreHarness.newShowMoreComponent({
      summary: 'Summary',
      content: 'Content'
    });

    // Click to expand
    await showMore.toggleContent();

    expect(showMore.isContentHidden).toBe(false);
    expect(showMore.buttonText).toBe('Show Less');
    expect(showMore.buttonAriaExpanded).toBe('true');

    // Click to collapse
    await showMore.toggleContent();

    expect(showMore.isContentHidden).toBe(true);
    expect(showMore.buttonText).toBe('Show More');
    expect(showMore.buttonAriaExpanded).toBe('false');
  });

  it('applies custom button styles when display-button is set', async () => {
    const showMore = await ShowMoreHarness.newShowMoreComponent({
      summary: 'Summary',
      content: 'Content',
      displayButton: 'true',
    });
    
    const button = showMore.getButton();
    expect(button).not.toBeNull();
    
    // Note: Testing computed styles in JSDOM is limited
    // This might need to be an integration test rather than a unit test
    expect(showMore.element.getAttribute('display-button')).toBe('true');
  });
});