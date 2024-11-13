const {test} = require('@playwright/test');

test(`브라우저 없이 페이지 이동 테스트`, async({page}) => {
  await page.goto(`letminjae.tistory.com`);
});