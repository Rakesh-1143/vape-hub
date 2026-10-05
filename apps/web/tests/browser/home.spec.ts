import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("vape-hub:adult-entry:v1", "confirmed"),
  );
});
test("3D controls support inspection, rotation and ambient pause", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Rotate device" }),
  ).toBeEnabled();
  if (process.env.CI) {
    // Capture after the 1.5-second entrance, for review of actual rendered geometry.
    await page.waitForTimeout(1800);
    await page.screenshot({
      path: testInfo.outputPath("studio-hero.png"),
      animations: "disabled",
    });
  }
  await page
    .getByRole("button", { name: "Inspect design", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Assemble design", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".product-stage")).toHaveAttribute(
    "data-view",
    "exploded",
  );
  if (process.env.CI) {
    await page.waitForTimeout(1600);
    await page.screenshot({
      path: testInfo.outputPath("studio-inspection.png"),
      animations: "disabled",
    });
  }
  await page.getByRole("button", { name: "Rotate device" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Pause ambient motion" }).click();
  await expect(
    page.getByRole("button", { name: "Resume ambient motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Resume ambient motion" }).click();
  await page
    .getByRole("button", { name: "Assemble design", exact: true })
    .click();
  await expect(page.locator(".product-stage")).toHaveAttribute(
    "data-view",
    "assembled",
  );
  await page.getByRole("button", { name: "Next device" }).click();
  await expect(
    page.getByRole("heading", { name: "Midnight", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("scroll choreography preserves selection and adapts to mobile", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  if (testInfo.project.name === "desktop") {
    await expect(page.locator(".pin-spacer")).toHaveCount(2);
    const top = await page
      .locator(".hero")
      .evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y), top + 420);
    await expect(page.locator(".hero-story")).toHaveCSS(
      "visibility",
      "visible",
    );
    await expect(page.locator(".hero-intro")).toHaveCSS("visibility", "hidden");
  } else {
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".hero-story")).toBeHidden();
  }
  await expect(
    page.getByRole("button", { name: "Show Plum device" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".stage-poster")).toBeVisible();
});
test("homepage selection, links, layout and rendering", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Discover The Vape Hub" }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Next device" }).click();
  await expect(
    page.getByRole("heading", { name: "Midnight", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Show Midnight device" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator("#top")
      .evaluate((el) => (el as HTMLElement).style.getPropertyValue("--accent")),
  ).toBe("#7eacd6");
  await page.getByRole("button", { name: "Previous device" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Plum", exact: true }),
  ).toBeVisible();
  for (let i = 0; i < 6; i++)
    await page.getByRole("button", { name: "Next device" }).click();
  await expect(
    page.getByRole("heading", { name: "Plum", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: /E-Liquids.*Explore/i }).click();
  await expect(page.locator("#category-liquids")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Call the store" }),
  ).toHaveAttribute("href", "tel:+17199249524");
  await page.getByText("Can I order online?", { exact: true }).click();
  await expect(
    page.getByText(/Online ordering is not available/),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("reduced motion provides static presentation and mobile menu", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".stage-poster")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Show Copper device" }).click();
  await expect(page.locator(".stage-poster")).toHaveAttribute(
    "src",
    "/assets/images/device-copper.svg",
  );
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Our store", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
});
test("failed scene chunk leaves poster, selection and contact usable", async ({
  page,
}) => {
  await page.route(/DeviceScene.*\.js/, (route) => route.abort());
  await page.route("**/src/features/home/scene/DeviceScene.tsx*", (route) =>
    route.abort(),
  );
  await page.goto("/");
  await expect(page.locator(".stage-poster")).toBeVisible();
  await page.getByRole("button", { name: "Next device" }).click();
  await expect(
    page.getByRole("heading", { name: "Midnight", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Get directions" }),
  ).toHaveAttribute("href", /google.com\/maps/);
});
test("unavailable WebGL leaves the static product presentation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.includes("webgl")) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".stage-poster")).toBeVisible();
  await page.getByRole("button", { name: "Next device" }).click();
  await expect(
    page.getByRole("heading", { name: "Midnight", exact: true }),
  ).toBeVisible();
});
