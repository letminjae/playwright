import { Locator, Page } from "@playwright/test"

class DashboardPage {
  products: Locator;
  productsText: Promise<Array<string>>;
  cart : Locator;

  constructor(page: Page) {
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b").allTextContents();
    this.cart = page.locator("[routerlink*=cart]");
  }
}
