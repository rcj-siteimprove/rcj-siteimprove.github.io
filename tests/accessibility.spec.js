import { Device } from "@siteimprove/alfa-device";
import { Document } from "@siteimprove/alfa-dom";
import { Native } from "@siteimprove/alfa-dom/native";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";
import { Browser, Builder } from "selenium-webdriver";
import { Audit, Logging } from "@siteimprove/alfa-test-utils";

// Set up web driver for chrome browser
const driver = await new Builder().forBrowser(Browser.CHROME).build();

// Navigate to the page to audit
await driver.get("http://localhost:8080");

// Get the document and turn it onto a page representation that the Code Checker can work with
const document = await driver.executeScript("return document;");
const documentJSON = await driver.executeScript(Native.fromNode, document);
// TODO: Get actual device from window
const device = Device.standard();
const alfaPage = Page.of(
  Request.empty(),
  Response.empty(),
  Document.from(documentJSON, device),
  device,
);

// Run an accessiblity audit
const alfaResult = await Audit.run(alfaPage);

// Log the result of the audit
Logging.result(alfaResult);

await driver.quit();
