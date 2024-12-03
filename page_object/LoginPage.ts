import { Locator, Page } from "@playwright/test";

class LoginPage {
  page: Page;
  signInButton: Locator;
  userName: Locator;
  password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.userName = page.locator("input#userEmail");
    this.password = page.locator("input#userPassword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username: string, password: string) {
    await this.page.waitForSelector("input#userEmail", { state: 'visible' });
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default LoginPage;
