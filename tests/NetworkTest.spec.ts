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
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.describe("@API Web API Test", () => {
  let response;
  let orderId;

  // API Test Setup - login and response
  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
  });

  test("@API fake response로 없는 주문창 만들기", async ({ page }) => {
    // addInitScript : 자바스크립트 구문을 삽입하여 페이지에서 실행 => 로컬스토리지에 토큰 세팅
    page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, response.token);
    // Intercepting response = API Response => {playwright fakeresponse} => browser => render data on frontend
    await page.route(
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async (route) => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill({
          response,
          body,
        });
      }
    );
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse(
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
    );

    console.log(await page.locator(".mt-4").textContent());
  });
});
