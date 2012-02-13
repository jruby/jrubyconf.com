When /^I manually override the "([^"]*)" hidden field to "([^"]*)"$/ do |selector, value|
  page.execute_script "$('#{selector}').val('#{value}')"
end
