import { expect, test, chromium } from "@playwright/test";
import writeExcelValue from "./utils/ExcelUtils";

test("엑셀 업로드 및 다운로드 테스트", async ({ page }) => {
  const textSearch = "Mango";
  const textValue = "350";

  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  await page.pause();
  await downloadPromise;
  writeExcelValue(
    textSearch,
    textValue,
    "/Users/chaminjae/Downloads/download.xlsx",
    { changeRow: 0, changeCol: 2 }
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("/Users/chaminjae/Downloads/download.xlsx");
  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole("row").filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
    textValue
  );
});
