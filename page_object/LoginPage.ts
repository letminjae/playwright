import { Locator, Page } from '@playwright/test';

class LoginPage {
  signInButton: Locator;
  userName: Locator;
  password: Locator;

  constructor(page: Page) {
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.userName = page.locator("input#userEmail");
    this.password = page.locator("input#userPassword");
  }

  async validLogin(userName: string, password: string) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInButton.click();
  }
}

export default LoginPage;
