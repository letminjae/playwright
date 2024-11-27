//Login UI => json으로 변경해서 테스트
//test browser => json , cart-,order, orderdetails, orderhistory
import { test, expect } from "@playwright/test";
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("cmjj0824@naver.com");
  await page.locator("#userPassword").fill("Qwer1234!");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  // state.json에 현재 웹 정보를 저장 => webContext 변수에 할당
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});
test("@API Test case 2", async () => {
  const email = "";
  const productName = "ZARA COAT 4";
  // webContext 사용
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForLoadState("networkidle");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
