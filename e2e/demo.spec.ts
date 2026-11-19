import { expect, test, type Page } from "@playwright/test";
import { sampleResult } from "../lib/sample";
import { freeResultSchema } from "../lib/schema";

const freeResult = freeResultSchema.parse(sampleResult);

async function mockAnalyze(page: Page, response: { status: number; body: string }) {
  await page.route("**/api/analyze", (route) =>
    route.fulfill({ status: response.status, contentType: "text/plain", body: response.body }),
  );
}

async function analyseSample(page: Page) {
  await page.goto("/#demo");
  await page.getByRole("button", { name: "Use sample meeting" }).click();
  await page.getByRole("button", { name: "Analyse meeting" }).click();
}

test("turns the sample meeting into a recap", async ({ page }) => {
  await mockAnalyze(page, { status: 200, body: JSON.stringify(freeResult) });
  await analyseSample(page);

  const demo = page.locator("#demo");
  await expect(demo.getByText(freeResult.summary)).toBeVisible();
  await expect(demo.getByText("Launch the beta on Friday")).toBeVisible();
  await expect(demo.getByText("Update the status page").filter({ visible: true })).toBeVisible();
  await expect(demo.getByText("included in Pro")).toBeVisible();
  await expect(demo.getByRole("button", { name: "Copy" })).toBeVisible();
});

test("shows a sample result when the model is busy", async ({ page }) => {
  await mockAnalyze(page, { status: 503, body: JSON.stringify({ error: "busy" }) });
  await analyseSample(page);

  await expect(page.getByText("The demo is busy right now")).toBeVisible();
  await expect(page.locator("#demo").getByText(freeResult.summary)).toBeVisible();
});

test("explains the rate limit next to the input", async ({ page }) => {
  await mockAnalyze(page, { status: 429, body: JSON.stringify({ error: "rate_limited" }) });
  await analyseSample(page);

  await expect(page.locator("#demo").getByRole("alert")).toHaveText(/Too many analyses/);
});

test("disables analysis for notes over the free limit", async ({ page }) => {
  await page.goto("/#demo");
  await page.getByLabel("Meeting notes").fill("a".repeat(4_001));

  await expect(page.getByRole("button", { name: "Analyse meeting" })).toBeDisabled();
  await expect(page.getByText("4,001 / 4,000")).toBeVisible();
});
