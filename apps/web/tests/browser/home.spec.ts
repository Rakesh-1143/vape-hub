import { expect, test } from "@playwright/test";
test("homepage selection, links, layout and rendering", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Find your next setup." }),
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
  await page.getByRole("link", { name: /E-liquids Explore/ }).click();
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
