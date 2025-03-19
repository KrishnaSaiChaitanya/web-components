import { TestHarness } from "element-test-harness";
import { html } from "lit";
import { ShowMore } from "../../../src/components/show-more/show-more.js";

export class ShowMoreHarness extends TestHarness {
  static newShowMoreComponent(data) {
    return this.fixture(html`<agno-show-more
      display-button="${data.displayButton}"
    >
      <span slot="summary">${data.summary}</span>
      <span slot="content" class="content" style="display:none;"
        >${data.content}</span
      >
    </agno-show-more>`);
  }

  qs(selector) {
    return this.element.shadowRoot.querySelector(selector);
  }

  get summaryText() {
    return this.qs(".summary").textContent.trim();
  }

  get contentText() {
    const slot = this.qs("slot[name='content']");
    const assigned = slot
      .assignedNodes()
      .map((node) => node.textContent)
      .join("")
      .trim();
    return assigned ? assigned.textContent.trim() : "";
  }

  get isContentHidden() {
    const content = this.qs(".content-hidden");
    return content ? content.classList.contains("content-hidden") : false;
  }

  get buttonText() {
    return this.qs(".show-more-text").textContent.trim() || "";
  }

  get buttonAriaExpanded() {
    return this.qs("button").getAttribute("aria-expanded");
  }

  async toggleContent() {
    this.getButton().click();
  }

  getButton() {
    return this.qs("button");
  }
}
