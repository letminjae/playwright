import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import CartPage from "./CartPage";
import OrdersReviewPage from "./OrdersReviewPage";
import OrdersHistoryPage from "./OrdersHistoryPage";

class POManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartPage;
  ordersReviewPage: OrdersReviewPage;
  ordersHistoryPage: OrdersHistoryPage;

  constructor(page: Page) {
    // page 확실히 명시 필요
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }

  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }
}

export default POManager;
