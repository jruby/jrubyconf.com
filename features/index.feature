Feature: Main conference pages
  As a person interested in JRubyConf
  I want to browse the conference website
  In order to register and participate in the conference

  @javascript
  Scenario: Intro
    Given I am on the home page
    Then the "#intro" element should be visible
    And the "#information" element should not be visible
    And the "#speakers" element should not be visible
    And the "#schedule" element should not be visible

  @javascript
  Scenario: Information
    Given I am on the home page
    Then the "#intro" element should be visible
    When I follow "Information" within "#content"
    Then the "#information" element should be visible
    And the "#intro" element should not be visible
    And the "#speakers" element should not be visible
    And the "#schedule" element should not be visible
