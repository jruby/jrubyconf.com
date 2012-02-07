Then /^the main navigation bar should be offscreen/ do
  wait_until { main_nav_offscreen } rescue nil
  main_nav_offscreen.should be_true
end

Then /^the main navigation bar should be onscreen/ do
  wait_until { !main_nav_offscreen } rescue nil
  main_nav_offscreen.should_not be_true
end
