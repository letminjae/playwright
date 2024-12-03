import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

class POManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;

  constructor(page: Page) {
    // page 확실히 명시 필요
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }
}

export default POManager;
