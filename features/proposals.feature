Feature: Proposal form
  As a potential speaker at JRubyConf
  I want to submit a proposal
  In order to obtain a speaking slot

  @javascript
  Scenario: Proposal Link
    Given I am on the home page
    And the "#intro" element is visible
    When I follow "Speakers" within "#content"
    And the "#speakers" element is visible
    And I follow "Submit a Proposal"
    Then the "#proposals" element should be visible

  @javascript
  Scenario: Create Proposal Form
    Given I am on /proposals
    When the "#proposals" element is visible
    And I fill in the following:
      | name           | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I press "Submit"
    Then I should see "Thank you"
    And I should see "edit"

  Scenario: Create Proposal Form Static
    Given I am on /proposals/new
    When I fill in the following:
      | name          | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I press "Submit"
    Then I should see "Thank you"
    And I should see "edit"

  @javascript
  Scenario: Create Proposal Invalid
    Given I am on /proposals
    When the "#proposals" element is visible
    And I press "Submit"
    Then the "#proposals" element should be visible
    And I should see "Oops"
    And I should see "know who you are"
    And I should see "need to be able to contact you"
    And I should see "need a few more details than that"
