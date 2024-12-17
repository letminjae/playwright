Feature: Ecommerce Validations
    @Validation
    @foo
    Scenario Outline: Placing the order
      Given a login to Ecommerce2 application with "<username>" and "<password>"
      Then Verify Error message is displayed

      Example:
      | username           | password   |
      | cmjj0824@naver.com | Qwer1234!  |
      | johndoe@gmail.com  | john1234   |
      | jane.doe@yahoo.com | jane1234   |