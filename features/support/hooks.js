const { After, Before, AfterStep, Status } =  require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

Before(async function () {
  // 모든 시나리오 실행 전 실행
  console.log("시나리오 수행 전 시작");
  const browser = await chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
});

AfterStep(async function ({ result }) {
  // 스텝 별 성공 이후 실행 코드, 스텝 실행 중 실패 시 스크린샷 캡쳐 코드를 작성.
  if (result.status === Status.FAILED) {
    const buffer = await this.page.screenshot();
    await this.page.screenshot({ path: "screenshot1.png" });
    this.attach(buffer.toString("base64"), "base64:image/png");
    console.log("Screenshot logged");
  }
});
After(async function () {
  console.log("마지막 수행");
});
