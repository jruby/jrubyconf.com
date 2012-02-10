Feature: Proposal form
  As a potential speaker at JRubyConf
  I want to submit a proposal
  In order to obtain a speaking slot

  @wip 
  Scenario: Proposal Link
    Given I am on the home page
    And the "#intro" element is visible
    When I follow "Speakers" within "#content"
    And the "#speakers" element is visible
    And I follow "Submit a Proposal"
    Then I should be on /#proposals

  @wip
  Scenario: Create Proposal Form
    Given I am on /#proposals
    When I fill in the following:
      | name          | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I press "Submit"
    Then I should see "Thank you"
    And I should see "edit link"

  @wip
  Scenario: Create Proposal Form Static
    Given I am on /proposals/new
    When I fill in the following:
      | name          | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I press "Submit"
    Then I should see "Thank you"
    And I should see "edit link"
