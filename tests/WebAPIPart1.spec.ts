import { test, expect, request } from "@playwright/test";

const loginPayload = {
  userEmail: "cmjj0824@naver.com",
  userPassword: "Qwer1234!",
};

test.describe("Web API Test", () => {
  // 토큰 전역사용
  let token;
  
  // API Test Setup - login and response.json
  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
      `https://rahulshettyacademy.com/api/ecom/auth/login/`,
      {
        data: loginPayload,
      }
    );
    expect(loginResponse.ok()).toBeTruthy(); // 200, 201..
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
  });

  test.only("웹페이지 접속", async ({page}) => {
    // addInitScript : 자바스크립트 구문을 삽입하여 페이지에서 실행 => 로컬스토리지에 토큰 세팅
    page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");
  });

});
