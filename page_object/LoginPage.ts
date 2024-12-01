import { Locator, Page } from "@playwright/test";

class LoginPage {
  page: Page;
  signInButton: Locator;
  username: Locator;
  password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.username = page.locator("input#userEmail");
    this.password = page.locator("input#userPassword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async validLogin(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default LoginPage;
