Feature: Ecommerce Validations

    Scenario: Placing the order
      Given a login to Ecommerce application with "cmjj0824@naver.com" and "Qwer1234!"
      When Add "ZARA COAT 3" to Cart
      Then Verify "ZARA COAT 3" is displayed in the Cart
      When Enter valid details and Place the order
      Then Verify order in present in the OrderHistory