import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import POManager from "../../page_object/POManager";
let poManager;

Given(
  "a login to Ecommerce application with {string} and {string}",
  async function (username, password) {
    this.poManager = new POManager(this.page);
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When("Add {string} to Cart", async function (productName) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When("Enter valid details and Place the order", async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("kor", " Korea, Republic of");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order in present in the OrderHistory", async function () {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.navigateToOrders();
  const orderHistoryPage = this.poManager.getOrdersHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(this.orderId);

  // Order ID 검증
  const fetchedOrderId = await orderHistoryPage.getOrderId();
  expect(this.orderId.includes(fetchedOrderId)).toBeTruthy();
});

// ---------------------- ErrorValidation ----------------------

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function () {
    // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
    const cardTitles = this.page.locator(".card-body a");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    // css
    await userName.fill("cmjj0824");
    await this.page.locator("[type='password']").fill("learning");
    await signIn.click();
  }
);

Then("Verify Error message is displayed", async function () {
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});
