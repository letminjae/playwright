"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginPage_1 = require("./LoginPage");
var DashboardPage_1 = require("./DashboardPage");
var CartPage_1 = require("./CartPage");
var OrdersReviewPage_1 = require("./OrdersReviewPage");
var OrdersHistoryPage_1 = require("./OrdersHistoryPage");
var POManager = /** @class */ (function () {
    function POManager(page) {
        // page 확실히 명시 필요
        this.page = page;
        this.loginPage = new LoginPage_1.default(this.page);
        this.dashboardPage = new DashboardPage_1.default(this.page);
        this.cartPage = new CartPage_1.default(this.page);
        this.ordersReviewPage = new OrdersReviewPage_1.default(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage_1.default(this.page);
    }
    POManager.prototype.getLoginPage = function () {
        return this.loginPage;
    };
    POManager.prototype.getDashboardPage = function () {
        return this.dashboardPage;
    };
    POManager.prototype.getCartPage = function () {
        return this.cartPage;
    };
    POManager.prototype.getOrdersReviewPage = function () {
        return this.ordersReviewPage;
    };
    POManager.prototype.getOrdersHistoryPage = function () {
        return this.ordersHistoryPage;
    };
    return POManager;
}());
exports.default = POManager;
