const { test, expect } = require("@playwright/test");

test("E2E Test 과제 - 쇼핑물 제품 구입 E2E 테스트", async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "cmjj0824@naver.com";
  const password = "Qwer1234!";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type(password);
  await page.locator("[value='Login']").click();

  // 제품 구입 페이지 대기
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  // 제품 구입 페이지
  const titles = await page.locator(".card-body b").allTextContents();
  const count = await products.count(); // 제품 개수 구하기
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // 장바구니 추가
      await products.nth(i).locator("text= Add to Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  // await page.pause();

  // 장바구니 페이지
  // 카드 로드 후 다음 Step 확인
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // true or false
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();

  // 결제 페이지 - 국가선택
  // Key를 하나씩 눌러야 추천 드롭다운이 열림 - pressSequentially
  await page.locator("[placeholder*='Country']").pressSequentially("korea");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  console.log(optionsCount);
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " Korea, Republic of") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  // 결제 페이지 - 아이디 확인
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  // 결제 성공
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  // 주문 내역 확인
  await page.locator("button[routerLink*=myorders]").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  const trCount = await rows.count();
  for (let i = 0; i < trCount; ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if (orderId.includes(rowOrderId)) {
      // 세부 내역 확인
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  // 세부 내역의 주문정보 확인
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
