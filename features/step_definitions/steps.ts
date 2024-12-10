import { When, Then, Given } from "@cucumber/cucumber";
import POManager from "../../page_object/POManager";
import { Location, test, expect } from "@playwright/test";

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    const poManager = new POManager(this.page);
    const products = this.page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When("", async function () {});

Then("", async function () {});
