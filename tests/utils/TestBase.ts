import { test as baseTest } from '@playwright/test';

type TestData = {
  username: string;
  password: string;
  productName: string;
};

const customTest = baseTest.extend<{
  testDataForOrder: TestData;
}>({
  testDataForOrder: {
    username: 'anshika@gmail.com',
    password: 'Iamking@000',
    productName: 'ADIDAS ORIGINAL',
  },
});

export { customTest };
