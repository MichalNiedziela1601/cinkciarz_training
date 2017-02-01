Feature: Set Wallet value

  Scenario: Set wrong value
    When I browse to the "/"
    When I enter "0" into "startModal.mInput" field
    Then I click "startModal.mOk"

