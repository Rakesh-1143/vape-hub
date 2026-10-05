import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("entry confirmation persists, content is gated, and storage failure is recoverable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Adults 21+ Only" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Enter Site" })).toBeFocused();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Discover The Vape Hub" }),
  ).toBeVisible();
  await expect(page.locator("#main")).toBeFocused();
  await page.reload();
  await expect(page.getByRole("button", { name: "Enter Site" })).toHaveCount(0);
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.reload();
  await page.getByRole("button", { name: "Enter Site" }).click();
  await expect(
    page.getByRole("heading", { name: "Discover The Vape Hub" }),
  ).toBeVisible();
});
test("entry, FAQ, policies and metadata expose usable semantics", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const entryAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(entryAudit.violations).toEqual([]);
  await page.getByRole("button", { name: "Enter Site" }).click();
  await page.locator("#questions").scrollIntoViewIfNeeded();
  const question = page.getByRole("button", { name: "Can I order online?" });
  await question.focus();
  await page.keyboard.press("Space");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "Can I order online?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Do I need to bring ID?" }).click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page).toHaveURL(/#policy-privacy$/);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://rakesh-1143.github.io/vape-hub/",
  );
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(schema || "{}").address.streetAddress).toBe(
    "1281 West Pueblo Boulevard",
  );
  expect(schema).not.toContain("openingHours");
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
});
test("product story uses coordinated desktop copy and removes pins under reduced motion", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() =>
    localStorage.setItem("vape-hub:adult-entry:v1", "confirmed"),
  );
  await page.goto("/");
  const top = await page
    .locator("#product-story")
    .evaluate((el) => el.getBoundingClientRect().top + scrollY);
  await page.evaluate(
    (y) => scrollTo(0, y),
    top + (testInfo.project.name === "desktop" ? 440 : 120),
  );
  if (testInfo.project.name === "mobile")
    await page.locator(".story-stage").scrollIntoViewIfNeeded();
  await expect(page.locator(".story-stage canvas")).toBeVisible();
  if (testInfo.project.name === "desktop") {
    await expect(page.locator(".story-copy-1")).toHaveCSS(
      "visibility",
      "visible",
    );
    await expect(page.locator(".story-copy-0")).toHaveCSS(
      "visibility",
      "hidden",
    );
  } else await expect(page.locator(".story-copy-2")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".story-copy-2")).toBeVisible();
});
test("failed secondary scene keeps every category story and store link usable", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("vape-hub:adult-entry:v1", "confirmed"),
  );
  await page.route(/StoryScene.*\.js/, (route) => route.abort());
  await page.goto("/");
  await page.locator(".story-stage").scrollIntoViewIfNeeded();
  await expect(page.locator(".story-poster")).toBeVisible();
  await page.locator(".story-copy-0").getByRole("link").click();
  await expect(page).toHaveURL(/#collection$/);
  await expect(
    page.getByRole("link", { name: "Call the shop" }),
  ).toHaveAttribute("href", "tel:+17199249524");
});
test("responsive layout remains readable from 320px to 1920px", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "The responsive matrix runs once.",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() =>
    localStorage.setItem("vape-hub:adult-entry:v1", "confirmed"),
  );
  test.setTimeout(180000);
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Discover The Vape Hub" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    await page.locator("#collection").scrollIntoViewIfNeeded();
    await expect(page.locator(".universe-card")).toHaveCount(6);
    await page.locator("#our-store").scrollIntoViewIfNeeded();
    await expect(page.getByText("Hours are being confirmed")).toBeVisible();
    if (process.env.CI && [320, 768, 1920].includes(width))
      await page.screenshot({
        path: testInfo.outputPath(`layout-${width}.png`),
        animations: "disabled",
      });
  }
});
