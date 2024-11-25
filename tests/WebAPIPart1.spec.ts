import { test, expect, request } from "@playwright/test";

const loginPayload = {
  userEmail: "cmjj0824@naver.com",
  userPassword: "Qwer1234!",
};

test.describe("Web API Test", () => {
  test.beforeAll(async () => {
    // API Test Setup - login and response.json
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
      `https://rahulshettyacademy.com/api/ecom/auth/login/`,
      {
        data: loginPayload,
      }
    );
    expect(loginResponse.ok()).toBeTruthy(); // 200, 201..
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
  });
});
