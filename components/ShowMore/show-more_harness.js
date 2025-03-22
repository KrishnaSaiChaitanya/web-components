import { fixture, html } from '@open-wc/testing-helpers';

export class ShowMoreHarness {
  static async newShowMoreComponent(data) {
    const element = await fixture(html`<agno-show-more
      display-button="${data.displayButton || 'false'}"
    >
      <span slot="summary">${data.summary || ''}</span>
      <span slot="content" class="content">${data.content || ''}</span>
    </agno-show-more>`);
    
    return new ShowMoreHarness(element);
  }

  constructor(element) {
    this.element = element;
  }

  qs(selector) {
    return this.element.shadowRoot.querySelector(selector);
  }

  get summaryText() {
    const slot = this.qs('slot[name="summary"]');
    const assigned = slot.assignedNodes();
    return assigned.length ? assigned[0].textContent.trim() : '';
  }

  get contentText() {
    const slot = this.qs('slot[name="content"]');
    const assigned = slot.assignedNodes();
    return assigned.length ? assigned[0].textContent.trim() : '';
  }

  get isContentHidden() {
    return this.qs('#content').classList.contains('content-hidden');
  }

  get buttonText() {
    return this.qs('.show-more-text').textContent.trim();
  }

  get buttonAriaExpanded() {
    return this.qs('button').getAttribute('aria-expanded');
  }

  async toggleContent() {
    this.qs('button').click();
    return new Promise(resolve => setTimeout(resolve, 10)); // Small delay for any animations
  }

  getButton() {
    return this.qs('button');
  }
}