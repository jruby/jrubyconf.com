Then /^mail should be delivered to "([^\"]*)"$/ do |email|
  should have_sent_email.to(email)
end

Then /^no mail should be delivered$/ do
  should_not have_sent_email
end

Then /^mail should have subject "([^\"]*)"$/ do |subject|
  should have_sent_email.matching_subject(/#{Regexp.quote(subject)}/m)
end

Then /^mail should have body "([^\"]*)"$/ do |body|
  should have_sent_email.matching_body(/#{Regexp.quote(body)}/m)
end
