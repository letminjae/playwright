import { test, expect } from "@playwright/test";

test.describe("과제 테스트", () => {

  test.only("로그인 후 타이틀 선택", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
  
    await page.locator("input#userEmail").fill("cmjj0824@naver.com");;
    await page.locator("input#userPassword").fill("Qwer1234!");

    await page.getByRole("button", {name: "Login"}).click();

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/dash");
  });
})