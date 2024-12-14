import { When, Then, Given } from "@cucumber/cucumber";
import POManager from "../../page_object/POManager";
import { Location, test, expect, chromium } from "@playwright/test";

Given(
  "a login to Ecommerce application with {username} and {password}",
  async function (username, password) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When("Add {string} to Cart", async function (string) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the cart", async function (string) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(data.productName);
  await cartPage.checkout();
});

When("Enter valid details and Place the order", async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("kor", "Korea, republic of");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
});

Then("Verify order in present in the OrderHistory", async function(){
  await this.dashboardPage.navigateToOrderHistory();
  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
})
