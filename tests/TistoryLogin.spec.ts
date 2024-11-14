import { test, expect } from "@playwright/test";

test.describe("티스토리 로그인 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount&talk_login=&login_type=simple#login"
    );
  });

  test("페이지 정상적 로딩", async ({ page }) => {
    await expect(page).toHaveTitle(/Kakao Account/); // 타이틀이 특정 문자열을 포함하는지 확인
  });

  test("로그인 실패", async ({ page }) => {
    const usernameInput = await page.locator("input#loginId--1");
    const passwordInput = await page.locator("input#password--2");
    await usernameInput.fill("testtest");
    await passwordInput.fill("qwe123");
    await page.locator("[type=submit]").click();

    const errorAlert = await page.locator('div.box_desc')
    // console.log(errorAlert.textContent());
    await expect(errorAlert).not.toBeVisible(); // 나는 로봇이 아닙니다 출력되어 보이지 않아야함;
  });
});
