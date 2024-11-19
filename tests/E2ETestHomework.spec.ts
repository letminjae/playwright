const { test, expect } = require("@playwright/test");

test("E2E Test 과제", async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "cmjj0824@naver.com";
  const password = "Qwer1234!";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type(password);
  await page.locator("[value='Login']").click();
});
