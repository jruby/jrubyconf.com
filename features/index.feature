Feature: Main conference pages
  As a person interested in JRubyConf
  I want to browse the conference website
  In order to register and participate in the conference

  @javascript @smoke
  Scenario: Intro
    Given I am on the home page
    Then the "#intro" element should be visible
    And the "#information" element should not be visible
    And the "#speakers" element should not be visible
    And the "#schedule" element should not be visible
    And the main navigation bar should be offscreen
    And there should be a register link

  @javascript @smoke
  Scenario: Information
    Given I am on the home page
    And the "#intro" element is visible
    When I follow "Information" within "#content"
    Then the "#information" element should be visible
    And the "#intro" element should not be visible
    And the "#speakers" element should not be visible
    And the "#schedule" element should not be visible
    And the main navigation bar should be onscreen
    And there should be a register link

  @javascript @smoke
  Scenario: Speakers
    Given I am on the home page
    And the "#intro" element is visible
    When I follow "Speakers" within "#content"
    Then the "#speakers" element should be visible
    And the "#intro" element should not be visible
    And the "#information" element should not be visible
    And the "#schedule" element should not be visible
    And the main navigation bar should be onscreen
    And there should be a register link

  @javascript @smoke
  Scenario: Schedule
    Given I am on the home page
    And the "#intro" element is visible
    When I follow "Speakers" within "#content"
    And the "#schedule_link" element is visible
    And I follow "Schedule" within "#speakers"
    Then the "#schedule" element should be visible
    And the "#intro" element should not be visible
    And the "#information" element should not be visible
    And the "#speakers" element should not be visible
    And the main navigation bar should be onscreen
    And there should be a register link

  @javascript @smoke
  Scenario: Redirect Anchors
    When I go to /speakers
    Then the "#speakers" element should be visible

    When I go to /schedule
    Then the "#schedule" element should be visible

    When I go to /information
    Then the "#information" element should be visible
