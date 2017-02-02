Feature: Buy USD

  Scenario: No value
    When I browse to the "/"
    When I click "startModal.mOk"
    Then I should see "Nie wpisałeś wartości" in "startModal.mHide"

  Scenario: Set wrong value
    When I wait "4" seconds for
    When I enter "0" into "startModal.mInput" field
    And I click "startModal.mOk"
    Then I should see "Wpisałeś ujemną lub zerową wartość" in "startModal.mHide"

  Scenario: Go to buy usd
    When I wait "4" seconds for
    When I enter "1000" into "startModal.mInput" field
    And I click "startModal.mOk"
    Then the current URL should be "/#/main"
    Then I should see "PLN" in "cKey" column in row "1" of "main.walletShow" div
    And I should see "1,000.00" in "walCurrency" column in row "1" of "main.walletShow" div
    When I click "tBuy" in row "1" of "main.tRates" table
    Then the current URL should be "/#/buy/USD"

  Scenario: No value for buy
    When I click "buy.buyButton"
    Then I should see "Nie wpisałeś ilości" in "buy.errorDiv"
    When I wait "5" seconds for
    Then I should see "" in "buy.errorDiv"

  Scenario: Set wrong value
    When I enter "-1" into "buy.currencyValue" field
    And I click "buy.buyButton"
    Then I should see "Wpisałeś wartość poniżej zera" in "buy.errorDiv"
    When I wait "4" seconds for
    Then I should see "" in "buy.errorDiv"

  Scenario: Set too much
    When I enter "500" into "buy.currencyValue" field
    And I click "buy.buyButton"
    Then I should see "Za mało środków" in "buy.errorDiv"
    When I wait "4" seconds for
    Then I should see "" in "buy.errorDiv"

  Scenario: Buy 100 usd
    When I enter "100" into "buy.currencyValue" field
    And I click "buy.buyButton"
    Then I should see "USD: 100.00" in "buy.wCurrency"

  Scenario: back to main
    When I click "buy.backButton"
    Then the current URL should be "/#/main"

  Scenario: Go to sell usd
    When I click "tSell" in row "1" of "main.tRates" table
    Then the current URL should be "/#/sell/USD"

  Scenario: No value for buy
    When I click "sell.sellButton"
    Then I should see "Nie wpisałeś ilości" in "sell.errorDiv"
    When I wait "5" seconds for
    Then I should see "" in "sell.errorDiv"

  Scenario: Set wrong value
    When I enter "-1" into "sell.currencyValue" field
    And I click "sell.sellButton"
    Then I should see "Wpisałeś wartość poniżej zera" in "sell.errorDiv"
    When I wait "4" seconds for
    Then I should see "" in "sell.errorDiv"

  Scenario: Set too much
    When I enter "500" into "sell.currencyValue" field
    And I click "sell.sellButton"
    Then I should see "Za mało środków" in "sell.errorDiv"
    When I wait "4" seconds for
    Then I should see "" in "sell.errorDiv"

  Scenario: Sell 10 usd
    When I enter "10" into "sell.currencyValue" field
    And I click "sell.sellButton"
    Then I should see "USD: 90.00" in "sell.wCurrency"

  Scenario: back to main
    When I click "sell.backButton"
    Then the current URL should be "/#/main"

  Scenario: Turn on random
    When I click "main.random"
    And I wait "12" seconds for

  Scenario: Turn off random
    Then I click "main.random"
    And I wait "2" seconds for

  Scenario: Reset wallet
    When I click "main.reset"
    When  I click "confirmModal.ok" and wait
    Then the current URL should be "/#/"


