import { expect, test } from "@playwright/test";
import POManager from "../page_object/POManager";
import data from "./utils/TestData";
import { customTest } from "./utils/TestBase";

test("@Web POM E2E Test", async ({ page }) => {
  const jsonData = JSON.parse(JSON.stringify(data));

  const poManager = new POManager(page);

  // 로그인 PO
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);

  // 대시보드 PO
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  // 카트 PO
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  // 주문 PO
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("kor", " Korea, Republic of");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();

  await dashboardPage.navigateToOrders();

  // 주문 내역 PO
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  const fetchedOrderId = await ordersHistoryPage.getOrderId();
  if (orderId) {
    expect(orderId.includes(fetchedOrderId || "")).toBeTruthy();
  } else {
    throw new Error("orderId is null.");
  }
});

// custom test - TestBase.ts
customTest("@Web Custom Test", async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});
