When /^I manually override the "([^"]*)" hidden field to "([^"]*)"$/ do |selector, value|
  page.execute_script "$('#{selector}').val('#{value}')"
end

Given /^an existing proposal:$/ do |table|
  @proposal = Proposal.new
  table.raw.each do |name,value|
    @proposal.send("#{name}=", value)
  end
  @proposal.save!
end

Then /the proposal field "([^"]*)" should be "([^"]*)"/ do |field,value|
  @proposal.reload
  @proposal.send(field).should == value
end

Then /the proposal should be withdrawn/ do
  @proposal.reload
  @proposal.withdraw?.should be_true
end
