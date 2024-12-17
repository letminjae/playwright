Feature: Ecommerce Validations
    @Validation
    @foo
    Scenario: Placing the order
      Given a login to Ecommerce2 application with "cmjj0824@naver.com" and "Qwer1234!"
      Then Verify Error message is displayed