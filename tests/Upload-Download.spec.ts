import { test } from "@playwright/test";

test("엑셀 업로드 및 다운로드 테스트", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  await page.getByRole("button", { name: "Download" }).click();

});
