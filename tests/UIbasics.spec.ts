import { test, expect } from "@playwright/test";

test.describe("나의 티스토리 블로그 UI 테스트", () => {
  test.beforeEach(async({page}) => {
    await page.goto("/");
  })

  test(`페이지 이동 후 검색창에 요소 입력`, async ({ page }) => {
    await page.locator("input#keyword").fill("QA");
  });

  test(`사이드 바 타이틀 클릭`, async ({ page }) => {
    await page.getByRole('link', { name: "개발과 품질 그 사이" }).click();
  });
});
