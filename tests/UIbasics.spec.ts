import { test, expect } from "@playwright/test";

test.describe("나의 티스토리 블로그 UI 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("페이지 정상적 로딩", async ({ page }) => {
    await expect(page).toHaveURL("https://letminjae.tistory.com/");
    await expect(page).toHaveTitle(/개발과 품질 그 사이/); // 타이틀이 특정 문자열을 포함하는지 확인
  });

  test("전체 글 테스트", async ({ page }) => {
    const allTitle = page.getByText("전체 글");
    await expect(allTitle).toBeVisible();
  });

  test(`페이지 이동 후 검색창에 요소 입력`, async ({ page }) => {
    await page.locator("input#keyword").fill("QA");
    await page.locator("input#keyword").press("Enter");
    await expect(page).toHaveURL("/search/QA");
  });

  test("블로그 다크모드 전환", async ({ page }) => {
    const themeButton = await page.locator("button.theme").click();

    // 특정 요소의 배경색이 다크 모드 색상으로 변경되었는지 확인 (예: body의 배경색)
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(backgroundColor).toBe("rgb(30, 31, 33)");
  });

  test(`첫 번째 글의 제목 확인`, async ({ page }) => {
    // nth로 첫번째 요소만 가져오기
    const titleLocator = page.locator(".post .header .tit").nth(0);

    // 요소가 로드될 때까지 대기
    await expect(titleLocator).toBeVisible();

    // 텍스트 콘텐츠 가져오기
    const titleText = await titleLocator.textContent();
    console.log(titleText?.trim()); // 텍스트 공백 제거 후 출력
  });
});
