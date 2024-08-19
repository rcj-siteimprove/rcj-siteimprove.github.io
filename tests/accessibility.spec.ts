import { test, expect } from "@playwright/test";
import { Playwright } from "@siteimprove/alfa-playwright";

test("can get alfa page", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  const document = await page.evaluateHandle(() => window.document);

  const alfaPage = await Playwright.toPage(document);

  expect(alfaPage).toBeTruthy();
});
