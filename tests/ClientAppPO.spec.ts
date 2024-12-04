import { expect, test } from "@playwright/test";
import POManager from "../page_object/POManager";

test.describe("POM 테스트", () => {
  test("E2E Test", async ({ page }) => {
    const username = "cmjj0824@naver.com";
    const password = "Qwer1234!";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");

    const poManager = new POManager(page);

    // 로그인 PO
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    // 대시보드 PO
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    // 카트 PO
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    // 주문 PO
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("kor", " Korea, Republic of");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();

    await dashboardPage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    const fetchedOrderId = await ordersHistoryPage.getOrderId();
    if (orderId) {
      expect(orderId.includes(fetchedOrderId || "")).toBeTruthy();
    } else {
      throw new Error("orderId is null.");
    }
  });
});
