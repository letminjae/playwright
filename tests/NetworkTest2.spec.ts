import { expect, test } from "@playwright/test";

test("@API API Intercept 관련 보안 테스트", async ({ page }) => {
  // 로그인 후 주문
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("cmjj0824@naver.com");
  await page.locator("#userPassword").fill("Qwer1234!");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();
  // 1번째 파라미터에 대한 API를 받으면, continue 메서드로 계속 테스트를 진행한다.
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) => {
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6581ca399fd99c85e8ee7f45",
      }); // Zara Coat 3
    }
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(
    page.getByText("You are not authorize to view this order")
  ).toBeVisible();
});
