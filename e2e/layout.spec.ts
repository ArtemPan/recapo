import { expect, test } from "@playwright/test";

test("has no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});

test("pricing toggle switches to yearly prices", async ({ page }) => {
  await page.goto("/#pricing");
  await page.getByRole("radio", { name: /Yearly/ }).click();
  await expect(page.getByText("$120")).toBeVisible();
});

test("mobile menu opens and closes after navigation", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Pricing" }).click();
  await expect(menu).toBeHidden();
});

test("pricing cards stack on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/#pricing");
  const free = await page.getByRole("heading", { name: "Free", exact: true }).boundingBox();
  const pro = await page.getByRole("heading", { name: "Pro", exact: true }).boundingBox();
  expect(free && pro && pro.y > free.y + free.height).toBe(true);
});
