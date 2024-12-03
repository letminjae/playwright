import { test } from "@playwright/test";
import POManager from "../page_object/POManager";

test.describe("과제 테스트", () => {
  test("로그인 후 타이틀 선택", async ({ page }) => {
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
  });
});
