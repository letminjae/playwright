import { test, expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const loginPayload = {
  userEmail: "cmjj0824@naver.com",
  userPassword: "Qwer1234!",
};
const orderPayload = {
  orders: [
    {
      country: "Korea, Republic of",
      productOrderedId: "6581ca399fd99c85e8ee7f45",
    },
  ],
};
let orderId;

test.describe("Web API Test", () => {
  let response;

  // API Test Setup - login and response
  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
  });

  test("API 주문 응답 이후 페이지 진입", async ({ page }) => {
    // addInitScript : 자바스크립트 구문을 삽입하여 페이지에서 실행 => 로컬스토리지에 토큰 세팅
    page.addInitScript((value) => {
      window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < (await rows.count()); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  });
});
