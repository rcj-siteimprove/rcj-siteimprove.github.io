import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  await expect(page).toHaveTitle(/rcj-siteimprove.github.io/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  await page
    .getByRole("link", { name: "decompress-extension-scrape/" })
    .click();

  await expect(
    page.getByRole("heading", { name: "Decompress Page Scrape" }),
  ).toBeVisible();
});
