"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_1 = require("@cucumber/cucumber");
var POManager_1 = require("../../page_object/POManager");
var test_1 = require("@playwright/test");
var poManager;
(0, cucumber_1.Given)("a login to Ecommerce application with {string} and {string}", { timeout: 100 * 1000 }, function (username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, products, loginPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_1.chromium.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext()];
                case 2:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    this.poManager = new POManager_1.default(page);
                    products = page.locator(".card-body");
                    loginPage = this.poManager.getLoginPage();
                    return [4 /*yield*/, loginPage.goTo()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, loginPage.validLogin(username, password)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
(0, cucumber_1.When)("Add {string} to Cart", function (productName) {
    return __awaiter(this, void 0, void 0, function () {
        var dashboardPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dashboardPage = this.poManager.getDashboardPage();
                    return [4 /*yield*/, dashboardPage.searchProductAddCart(productName)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dashboardPage.navigateToCart()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
(0, cucumber_1.Then)("Verify {string} is displayed in the Cart", function (productName) {
    return __awaiter(this, void 0, void 0, function () {
        var cartPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cartPage = this.poManager.getCartPage();
                    return [4 /*yield*/, cartPage.VerifyProductIsDisplayed(productName)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cartPage.Checkout()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
(0, cucumber_1.When)("Enter valid details and Place the order", function () {
    return __awaiter(this, void 0, void 0, function () {
        var ordersReviewPage, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ordersReviewPage = this.poManager.getOrdersReviewPage();
                    return [4 /*yield*/, ordersReviewPage.searchCountryAndSelect("kor", " Korea, Republic of")];
                case 1:
                    _b.sent();
                    _a = this;
                    return [4 /*yield*/, ordersReviewPage.SubmitAndGetOrderId()];
                case 2:
                    _a.orderId = _b.sent();
                    console.log(this.orderId);
                    return [2 /*return*/];
            }
        });
    });
});
(0, cucumber_1.Then)("Verify order in present in the OrderHistory", function () {
    return __awaiter(this, void 0, void 0, function () {
        var dashboardPage, orderHistoryPage, fetchedOrderId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dashboardPage = this.poManager.getDashboardPage();
                    return [4 /*yield*/, dashboardPage.navigateToOrders()];
                case 1:
                    _a.sent();
                    orderHistoryPage = this.poManager.getOrdersHistoryPage();
                    return [4 /*yield*/, orderHistoryPage.searchOrderAndSelect(this.orderId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, orderHistoryPage.getOrderId()];
                case 3:
                    fetchedOrderId = _a.sent();
                    (0, test_1.expect)(this.orderId.includes(fetchedOrderId)).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    });
});
