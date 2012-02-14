Feature: News pages
  As an attendee of JRubyConf
  I want to read the news
  In order to understand what the conference has to offer

  @smoke
  Scenario: News Index Page
    Given I am on /news
    Then the "#news" element should be visible
    And the "#main_navigation" element should be visible
    And the "#footer" element should be visible
    And I should see "@JRubyConf"

  @smoke
  Scenario: News Item Page
    Given I am on /news
    When I follow the first link within "#content #news"
    Then the ".post-body" element should be visible
    And the "#main_navigation" element should be visible
    And the "#footer" element should be visible

