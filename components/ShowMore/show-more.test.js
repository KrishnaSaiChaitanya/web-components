import { describe, it, expect } from "@jest/globals";
import { ShowMoreHarness } from "../../../../lib/agno/testing/components/show-more/show-more_harness.js";

describe("ShowMore", () => {
  it("renders summary and content slots", async () => {
    const data = {
      summary: "This is the summary",
      content: "This is the hidden content",
      displayButton: "true",
    };
    const showMore = await ShowMoreHarness.newShowMoreComponent(data);

    const summarySlot = showMore.qs('slot[name="summary"]');
    const contentSlot = showMore.qs('slot[name="content"]');

    const summaryText =
      summarySlot.assignedNodes()[0]?.textContent.trim() || "";
    const contentText =
      contentSlot.assignedNodes()[0]?.textContent.trim() || "";

    expect(summaryText).toBe(data.summary);
    expect(contentText).toBe(data.content);
  });

  it("hides content by default", async () => {
    const showMore = await ShowMoreHarness.newShowMoreComponent({});
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const content = showMore.qs("div.content-hidden");
    expect(content).toBeTruthy();
    expect(showMore.buttonText).toBe("Show More");
    expect(showMore.buttonAriaExpanded).toBe("false");
  });

  it("toggles content visibility on button click", async () => {
    const showMore = await ShowMoreHarness.newShowMoreComponent({});

    //Click to expand
    await showMore.toggleContent();

    expect(showMore.isContentHidden).toBe(false);
    expect(showMore.buttonText).toBe("Show Less");
    expect(showMore.buttonAriaExpanded).toBe("true");

    //Click to collapse
    await showMore.toggleContent();

    expect(showMore.isContentHidden).toBe(true);
    expect(showMore.buttonText).toBe("Show More");
    expect(showMore.buttonAriaExpanded).toBe("false");
  });

  it("applies custom button styles when display-button is set", async () => {
    const showMore = await ShowMoreHarness.newShowMoreComponent({
      displayButton: "true",
    });
    const button = showMore.getButton();
    expect(button).not.toBeNull();
    jest.spyOn(window, "getComputedStyle").mockReturnValue({
      backgroundColor: "rgb(244, 242, 239)",
    });

    const computedStyle = getComputedStyle(button);
    expect(computedStyle.backgroundColor).toBe("rgb(244, 242, 239)");
  });
});
