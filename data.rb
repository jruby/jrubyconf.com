SPEAKERS  = {}

SPEAKERS[:jrubyconf] = {
  :name    => 'Coming Soon',
  :title   => '',
  :avatar  => 'default.png',
  :bio     => "<p>Full speaker list and schedule coming soon. Schedule is subject to change.</p>",
  :twitter => 'jrubyconf'
}

1.upto(11) do |i|
SPEAKERS["jrubyconf#{i}".to_sym] = {
  :name    => 'Coming Soon',
  :title   => '',
  :avatar  => 'default.png',
  :bio     => "<p>Full speaker list and schedule coming soon. Schedule is subject to change.</p>",
  :twitter => 'jrubyconf'
}
end

require 'schedule'
