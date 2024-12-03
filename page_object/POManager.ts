import { Page } from '@playwright/test'
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

class POManager {
  loginPage: LoginPage
  dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }
}

export default POManager;
