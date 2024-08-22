import puppeteer from "puppeteer";
import { Audit, Logging } from "@siteimprove/alfa-test-utils";
import { Puppeteer } from "@siteimprove/alfa-puppeteer";

// Set up a Puppeteer instance
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate to the page to scrape
await page.goto("http://localhost:8081");

// Create a handle for the document object
const document = await page.evaluateHandle(() => window.document);

// Scrape the page
const alfaPage = await Puppeteer.toPage(document);

// Run an accessiblity audit
const alfaResult = await Audit.run(alfaPage);

// Log the result of the audit
Logging.result(alfaResult);

browser.close();
