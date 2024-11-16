import { test, expect } from "@playwright/test";

test.describe("과제 테스트", () => {

  test.only("로그인 후 타이틀 선택", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
  
    await page.locator("input#userEmail").fill("cmjj0824@naver.com");;
    await page.locator("input#userPassword").fill("Qwer1234!");

    await page.getByRole("button", {name: "Login"}).click();

    // dashboard page에 진입되는지 확인
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/dashboard/dash");

    // 네트워크 IDLE 될 때 까지 대기 (API 응답 다 받을 때 까지)
    await page.waitForLoadState('networkidle');

    // 판매제품 이름 모두 출력
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
  });
})