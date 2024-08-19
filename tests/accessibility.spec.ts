import { test, expect } from "@playwright/test";
import { Playwright } from "@siteimprove/alfa-playwright";
import { Audit, SIP, Logging } from "@siteimprove/alfa-test-utils";

test("page is accessible", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  const document = await page.evaluateHandle(() => window.document);

  const alfaPage = await Playwright.toPage(document);

  const alfaResult = await Audit.run(alfaPage);

  if (
    process.env.SI_USER_NAME !== undefined &&
    process.env.SI_API_KEY !== undefined
  ) {
    const pageReportURL = await SIP.upload(alfaResult, {
      userName: process.env.SI_USER_NAME!, // email address of the user.
      apiKey: process.env.SI_API_KEY!, // API key generated in the platform.
    });

    Logging.result(alfaResult, pageReportURL);
  } else {
    Logging.result(alfaResult);
  }

  const failingRules = alfaResult.resultAggregates.filter(
    (aggregate) => aggregate.failed > 0,
  );

  expect(
    failingRules.size,
    `The page has ${failingRules.size} failing rules`,
  ).toBe(0);
});
