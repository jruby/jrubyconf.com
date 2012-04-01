Feature: Proposal form
  As a potential speaker at JRubyConf
  I want to edit a proposal
  In order to modify my proposal

  Scenario: Create Proposal closed
    Given I am on /proposals/new
    Then I should see "Call for Proposals has closed"

  Scenario: Editing a Proposal
    Given an existing proposal:
      | name           | Nick                |
      | email          | nick@nicksieger.com |
      | title          | No mail please      |
      | abstract       | Foo bar baz         |
      | key            | thekey              |
    When I go to /proposals/edit/thekey
    And I fill in "name" with "Flannery"
    And I press "Submit"
    Then the proposal field "name" should be "Flannery"

  Scenario: Editing a Proposal Does Not Send Email
    Given an existing proposal:
      | name           | Nick                |
      | email          | nick@nicksieger.com |
      | title          | No mail please      |
      | abstract       | Foo bar baz         |
      | key            | thekey              |
    When I go to /proposals/edit/thekey
    And I fill in "name" with "Flannery"
    And I press "Submit"
    Then no mail should be delivered

  Scenario: Withdrawing a Proposal
    Given an existing proposal:
      | name           | Nick                |
      | email          | nick@nicksieger.com |
      | title          | Please withdraw     |
      | abstract       | Foo bar baz         |
      | key            | withdrawme          |
    When I go to /proposals/edit/withdrawme
    And I check "withdraw"
    And I press "Submit"
    Then the proposal should be withdrawn
