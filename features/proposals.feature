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
    Then I should see "Thank you, Nick"
    And I should see "edit"

  Scenario: Create Proposal Form Static
    Given I am on /proposals/new
    When I fill in the following:
      | name          | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I press "Submit"
    Then I should see "Thank you, Nick"
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

  Scenario: Edit Proposal
    Given I am on /proposals/new
    When I fill in the following:
      | name          | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I press "Submit"
    And I follow "edit your proposal"
    Then the "#proposals" element should be visible

  @javascript
  Scenario: Create and Resubmit Proposal Form
    Given I am on /proposals
    When the "#proposals" element is visible
    And I fill in the following:
      | name           | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I manually override the "input#key" hidden field to "constantkey"
    And I press "Submit"
    Then I should see "Thank you, Nick"
    When I go back
    And the "#proposals" element is visible
    And I fill in the following:
      | name           | Nick             |
      | email          | nick@example.com |
      | title          | All About JRuby  |
      | abstract       | Blah blah blah   |
    And I manually override the "input#key" hidden field to "constantkey"
    And I press "Submit"
    Then I should see "proposal was already created"

  Scenario: Create Proposal Sends Mail to Submitter
    Given I am on /proposals/new
    When I fill in the following:
      | name           | Nick             |
      | email          | nick@example.com |
      | title          | Please send mail |
      | abstract       | Yadda yadda      |
    And I press "Submit"
    Then I should see "Thank you, Nick"
    And mail should be delivered to "nick@example.com"
    And mail should have subject "Your JRubyConf proposal: Please send mail"
    And mail should have body "Thank you for submitting your talk"

  Scenario: Create Proposal Sends Mail to Admin
    Given I am on /proposals/new
    When I fill in the following:
      | name           | Nick             |
      | email          | nick@example.com |
      | title          | Please send mail |
      | abstract       | Yadda yadda      |
    And I press "Submit"
    Then mail should be delivered to "admin@example.com"
    And mail should have subject "JRubyConf proposal from Nick"
    And mail should have body "Nick submitted a talk."

  Scenario: Editing a Proposal Does Not Send Email
    Given an existing proposal:
      | name           | Nick             |
      | email          | nick@ejemplo.com |
      | title          | No mail please   |
      | abstract       | Foo bar baz      |
      | key            | thekey           |
    When I go to /proposals/edit/thekey
    And I fill in "name" with "Flannery"
    And I press "Submit"
    Then no mail should be delivered
