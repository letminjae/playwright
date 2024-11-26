export default class APIUtils {
  apiContext: any;
  loginPayload: string;

  constructor(apiContext: any, loginPayload: string) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );
    if (!loginResponse.ok()) {
      throw new Error(`Failed to login: ${loginResponse.statusText}`);
    }
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    return token;
  }

  async createOrder(orderPayload: string) {
    let response = { token: String, orderId: String };
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!orderResponse.ok()) {
      throw new Error(`Failed to create order: ${orderResponse.statusText}`);
    }
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}
