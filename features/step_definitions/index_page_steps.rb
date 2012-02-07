Then /^the main navigation bar should be offscreen/ do
  wait_until { main_nav_offscreen } rescue nil
  main_nav_offscreen.should be_true
end

Then /^the main navigation bar should be onscreen/ do
  wait_until { !main_nav_offscreen } rescue nil
  main_nav_offscreen.should_not be_true
end

Then /^there should be a register link/ do
  small = find('#register_now_small')
  large = find('#register_now_large')
  wait_until { small.visible? || large.visible? } rescue nil
  (small && small.visible? || large && large.visible?).should be_true
end
