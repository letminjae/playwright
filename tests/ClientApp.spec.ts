import { test, expect } from "@playwright/test";

test.describe("과제 테스트", () => {
  test("로그인 후 타이틀 선택", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("input#userEmail").fill("cmjj0824@naver.com");
    await page.locator("input#userPassword").fill("Qwer1234!");

    await page.getByRole("button", { name: "Login" }).click();

    // dashboard page에 진입되는지 확인
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );

    // 네트워크 IDLE 될 때 까지 대기 (API 응답 다 받을 때 까지)
    await page.waitForLoadState("networkidle");

    // 판매제품 이름 모두 출력
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
  });

  test.only("UI Control 테스트", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    const userName = page.locator("input#userEmail");
    const loginButton = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");

    // 라디오 버튼 클릭
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    // 드롭다운 버튼 클릭
    await dropdown.selectOption("consult");

    // 정책 체크버튼 클릭
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    // 정책 체크버튼 취소
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
  });
});
