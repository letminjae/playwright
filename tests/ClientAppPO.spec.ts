import { test, expect } from "@playwright/test";
import LoginPage from "../page_object/LoginPage";
import DashboardPage from "../page_object/DashboardPage";

test.describe("과제 테스트", () => {
  test("로그인 후 타이틀 선택", async ({ page }) => {
    const username = "cmjj0824@naver.com";
    const password = "Qwer1234!";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");

    // 로그인 PO
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    loginPage.validLogin(username, password);
    // dashboard page에 진입되는지 확인
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );

    // 대시보드 PO
    const dashboardPage = new DashboardPage(page);
    dashboardPage.searchProductAddCart(productName);
    dashboardPage.navigateToCart();
  });
});
